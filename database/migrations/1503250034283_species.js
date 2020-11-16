'use strict'
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpeciesSchema extends Schema {
  up () {
    this.create('species', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('avatar')
      table.timestamps()
    })
  }

  down () {
    this.drop('species')
  }
}

module.exports = SpeciesSchema
