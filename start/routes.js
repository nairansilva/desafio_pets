'use strict'
const Route = use('Route')

/*login*/

Route.post('sessions', 'SessionController.store')
Route.get('avatars/:name', 'FileController.show')
Route.get('species', 'SpeciesController.index')

/*Pets*/
Route.group(() => {
  Route.get('/', 'PetController.index')
  Route.get('/:id', 'PetController.show')
  Route.post('/', 'PetController.store')
  Route.put('/:id', 'PetController.update')
  Route.delete('/:id', 'PetController.destroy')
}).prefix('pets').middleware('auth')


/*Owner*/
Route.group(() => {
  Route.get('/', 'OwnerController.index')
  Route.get('/:id', 'OwnerController.show')
  Route.post('/', 'OwnerController.store')
  Route.put('/:id', 'OwnerController.update')
  Route.delete('/:id', 'OwnerController.destroy')
}).prefix('owner').middleware('auth')
