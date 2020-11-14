'use strict'
const User = use('App/Models/User')
class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const user = await User.query().where('email', email).first()
    const userJson = await user.toJSON()
    const returnUserValue = {
      email: userJson.email,
      name: userJson.name
    }
    token.user = returnUserValue
    return token
  }
}
module.exports = SessionController
