'use strict'
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BreedsSchema extends Schema {
  up () {
    this.create('breeds', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.integer('specie_id').unsigned().index()
      table.foreign('specie_id').references('id').on('species').onUpdate('cascade').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('breeds')
  }
}

module.exports = BreedsSchema
