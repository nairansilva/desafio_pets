'use strict'
const Route = use('Route')

/*login*/

Route.post('sessions', 'SessionController.store')
