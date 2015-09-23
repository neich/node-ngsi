var express = require('express')

module.exports = function (ngsiHandler) {
  var router = module.exports = express.Router()

  router.use(require('./op_resources')(ngsiHandler))
  router.use(function (err, req, res, next) {
    var json = { errorCode: {}}
    json.errorCode.code = err.code || 500
    json.errorCode.reasonPhrase = err.message || "Unknown error"
    res.status(500).json(json)
  })

  return router
}

