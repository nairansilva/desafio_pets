'use strict'
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')
class Owner extends Model {
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



  pets () {
    return this.hasMany('App/Models/Pet')
  }
}
module.exports = Owner
