'use strict'
const Pet = use('App/Models/Pet')
const Breed = use('App/Models/Breed')
const { validateAll } = use('Validator')

class PetController {
  async index ({ request }) {
     /* Paginação e Filtro */
     const query = request.get()
     const filter = query.filter ? decodeURI(query.filter) : ''
     const perPage = 1
     const orderCollumn = query.orderCollumn ? query.orderCollumn : 'name'
     const orderDir = query.orderDir ? (query.orderDir === 'asc') ? 'asc' : 'desc' : 'asc'
     const page = query.page ? query.page : 1
    const data = (!filter) ? await Pet.query().with('owner').with('specie').with('breed').orderBy(orderCollumn, orderDir).paginate(page, perPage) :
    await Pet.query().with('owner').with('specie').with('breed').where('name', 'LIKE', '%' + filter + '%').orderBy(orderCollumn, orderDir).paginate(page, perPage)
    return data
 }


  async store ({ request, response }) {

    const rules = {
      name: 'required|multunique:pets,name&owner_id',
      nickname: 'required',
      specie_id: 'exists:species,id',
      breed_id: 'exists:breeds,id',
      owner_id: 'required|exists:owners,id',
    }

    const messages = {
      'name.required': 'Informe o nome do pet',
      'nickname.required': 'Informe o apelido do pet',
      'specie_id.exists': 'Espécie inválida',
      'breed_id.exists': 'Raça inválida',
      'owner_id.exists': 'Dono inválido',
      'name.multunique': 'Pet já cadastrado para o dono',
    }

    const data = request.all()
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
    // verifica se raça pertence a espécie
    const breed = await Breed.query().where('specie_id',data.specie_id).where('id',data.breed_id).first()
    if(!breed){
      const errorMessages = {}
      errorMessages['breed_id'] = 'Raça não corresponde à espécie'
      return response.status(400).json({
        success: false,
        message: errorMessages
      })
    }

    var requestData = request.all()
    const pet = await Pet.create(requestData)
    return pet
  }

  async show ({  response, params }) {
    const pet = await Pet.query()
      .where('id', params.id)
      .first()

    if (!pet) {
      return response.status(400).json({
        success: false
      })
    }
    await pet.load('specie')
    await pet.load('breed')
    await pet.load('owner')
    return pet
  }

  async update ({ request, response, params }) {

    const rules = {
      name: 'required',
      nickname: 'required',
      specie_id: 'exists:species,id',
      breed_id: 'exists:breeds,id'
    }

    const messages = {
      'name.required': 'Informe o nome do pet',
      'nickname.required': 'Informe o apelido do pet',
      'specie_id.exists': 'Espécie inválida',
      'breed_id.exists': 'Raça inválida',
    }

    const pet = await Pet.query()
      .where('id', params.id)
      .first()

    if (!pet) {
      return response.status(400).json({
        success: false
      })
    }
    const data = request.only(['name', 'nickname', 'specie_id','breed_id'])
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

    // verifica se raça pertence a espécie
    const breed = await Breed.query().where('specie_id',data.specie_id).where('id',data.breed_id).first()
    if(!breed){
      const errorMessages = {}
      errorMessages['breed_id'] = 'Raça não corresponde à espécie'
      return response.status(400).json({
        success: false,
        message: errorMessages
      })
    }

    // Verifica se o dono ja cadastrou outro animal com o nome
    const petCheck = await Pet.query().where('name',data.name).where('id','<>',pet.id).first();

    if (petCheck) {
      const errorMessages = {}
      errorMessages['name'] = 'Pet ja cadastrado'
      return response.status(400).json({
        success: false,
        message: errorMessages
      })
    }

    pet.merge(data)
    await pet.save()
    await pet.load('specie')
    await pet.load('breed')
    return pet
  }

  async destroy ({  response, params }) {
    const pet = await Pet.query()
      .where('id', params.id)
      .first()

    if (!pet) {
      return response.status(401).json({
        success: false,
        message: 'Pet inválido'
      })
    }
    await pet.delete()
    return response.status(200).json({
      success: true,
      id: pet.id,
      message: 'Pet removido com sucesso'
    })

  }
}

module.exports = PetController
