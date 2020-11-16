'use strict'
const Owner = use('App/Models/Owner')
const { validateAll } = use('Validator')
class OwnerController {

  async index ({ request }) {
     /* Paginação e Filtro */
    const query = request.get()
    const filter = query.filter ? decodeURI(query.filter) : ''
    const perPage = 1
    const orderCollumn = query.orderCollumn ? query.orderCollumn : 'name'
    const orderDir = query.orderDir ? (query.orderDir === 'asc') ? 'asc' : 'desc' : 'asc'
    const page = query.page ? query.page : 1
    const data = (!filter) ? await Owner.query().with('pets').with('pets.specie').with('pets.breed').orderBy(orderCollumn, orderDir).paginate(page, perPage)
    : await Owner.query().with('pets').with('pets.specie').with('pets.breed').where('name', 'LIKE', '%' + filter + '%').orderBy(orderCollumn, orderDir).paginate(page, perPage)
    return data
  }

  async store ({ request, response }) {
    const rules = {
      name: 'required',
      email: 'required|unique,owners,email',
      phone: 'required',
    }
    const messages = {
      'name.required': 'Informe o nome do dono',
      'email.required': 'Informe o email do dono',
      'email.unique': 'Email já cadastrado para outro dono',
      'phone.required': 'Informe o telefone do dono',

    }
    const validation = await validateAll(request.all(), rules, messages)
    if (validation.fails()) {
      const errorMessages = {}
      validation.messages().forEach((e, i) => {
        errorMessages[e.field] = e.message
      })
      return response.status(400).json({
        success: false,
        message: errorMessages
      })
    } else {
      var requestData = request.all()
      const owner = await Owner.create(requestData)
      return owner
    }
  }

  async show ({  response, params }) {
    const owner = await Owner.query()
      .where('id', params.id)
      .first()

    if (!owner) {
      return response.status(400).json({
        success: false
      })
    }
    await owner.loadMany(['pets','pets.specie','pets.breed'])
    return owner
  }

  async update ({ request, response, params }) {
    const rules = {
      name: 'required',
      email: `required|unique,owners,email,id,${params.id}`,
      phone: 'required'
    }
    const messages = {
      'name.required': 'Informe o nome do dono',
      'email.required': 'Informe o email do dono',
      'email.unique': 'Email já cadastrado para outro dono',
      'phone.required': 'Informe o telefone do dono'
    }

    const owner = await Owner.query()
      .where('id', params.id)
      .first()

    if (!owner) {
      return response.status(400).json({
        success: false
      })
    }
    const data = request.only(['name', 'email', 'phone'])
    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      const errorMessages = {}
      validation.messages().forEach((e, i) => {
        errorMessages[e.field] = e.message
      })
      return response.status(400).json({
        success: false,
        message: errorMessages
      })
    }
    owner.merge(data)
    await owner.save()
    await owner.loadMany(['pets','pets.specie','pets.breed'])
    return owner
  }

  async destroy ({  response, params }) {
    const owner = await Owner.query()
      .where('id', params.id)
      .first()

    if (!owner) {
      return response.status(401).json({
        success: false,
        message: 'Dono inválido'
      })
    }
    await owner.delete()
    return response.status(200).json({
      success: true,
      id: owner.id,
      message: 'Dono removido com sucesso'
    })

  }

}

module.exports = OwnerController
