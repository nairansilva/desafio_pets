'use strict'

const Helpers = use('Helpers')
class FileController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.name}.png`))
  }
}

module.exports = FileController
