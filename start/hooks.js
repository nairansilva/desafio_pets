const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }

    if (Array.isArray(value)) {
      const [table, column] = args
      const rows = await Database.table(table).whereIn(column, value).getCount()
      if (!rows || rows !== value.length) {
        throw message
      }
    } else {
      const [table, column] = args
      const row = await Database.table(table).where(column, value).first()

      if (!row) {
        throw message
      }
    }
  }

  Validator.extend('exists', existsFn)
})

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')

  const multuniqueFn = async (data, field, message, args, get) => {
    const [table, column] = args
    const mensagem = message
    var sql = `SELECT * FROM ${table} WHERE`
    var columns = column.split('&')

    for (var i = 0; i < columns.length; i++) {
      if (i + 1 === columns.length) {
        sql = `${sql} ${table}.${columns[i]} = '${get(data, columns[i])}'`
      } else {
        sql = `${sql} ${table}.${columns[i]} = '${get(data, columns[i])}' AND`
      }
    }

    const postQuery = await Database.schema.raw(sql)
    if (postQuery[0].length) {
      throw mensagem
    }
  }

  Validator.extend('multunique', multuniqueFn)
})
