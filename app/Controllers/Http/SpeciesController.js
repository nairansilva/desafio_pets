'use strict'
const Specie = use('App/Models/Specie')
class SpeciesController {
  async index () {
     const data = await Specie.query().with('breeds', builder => { builder.orderBy('breeds.name', 'ASC') }).orderBy('species.name', 'asc').fetch()
     return data
  }
}

module.exports = SpeciesController
