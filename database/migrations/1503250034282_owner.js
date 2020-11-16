'use strict'
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OwnerSchema extends Schema {
  up () {
    this.create('owners', (table) => {
      table.uuid('id').primary()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('owners')
  }
}

module.exports = OwnerSchema
