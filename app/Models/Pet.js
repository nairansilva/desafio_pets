'use strict'
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')
class Pet extends Model {
  static get primaryKey () {
    return 'id'
  }
  static get incrementing () {
    return false
  }
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (userInstance) => {
      userInstance.id = uuidv4()
    })
  }

  owner () {
    return this.belongsTo('App/Models/Owner')
  }

  specie () {
    return this.belongsTo('App/Models/Specie')
  }

  breed () {
    return this.belongsTo('App/Models/Breed')
  }
}
module.exports = Pet
