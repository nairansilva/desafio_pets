'use strict'
const Model = use('Model')
const Env = use('Env')
class Specie extends Model {
  static boot () {
    super.boot()
  }

  static get computed () {
    return ['url']
  }

  getUrl ({ avatar }) {
    return `${Env.get('APP_URL')}/avatars/${avatar}`
  }

  breeds () {
    return this.hasMany('App/Models/Breed')
  }

}

module.exports = Specie
