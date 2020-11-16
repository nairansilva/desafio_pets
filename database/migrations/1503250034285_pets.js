'use strict'
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetsSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.uuid('id').primary()
      table.string('name', 80).notNullable()
      table.string('nickname', 80).notNullable()
      table.integer('specie_id').unsigned().index()
      table.foreign('specie_id').references('id').on('species').onUpdate('cascade').onDelete('cascade')
      table.integer('breed_id').unsigned().index()
      table.foreign('breed_id').references('id').on('breeds').onUpdate('cascade').onDelete('cascade')
      table.uuid('owner_id').index()
      table.foreign('owner_id').references('id').on('owners').onUpdate('cascade').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetsSchema
