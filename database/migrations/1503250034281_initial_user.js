'use strict'
const User = use('App/Models/User')
const Schema = use('Schema')
class UserInitial extends Schema {
  async up () {
    await User.create({name:'Tester', email: 'teste@totvs.com.br','password' : 'totvs#qaz' })
  }
  async down () {
    await User.query().where('email','teste@totvs.com.br').delete()
  }
}
module.exports = UserInitial
