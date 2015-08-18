var express = require('express')

module.exports = function (ctx) {
  var router = module.exports = express.Router()

  router.use(require('./op_resources')(ctx))
  router.use(function (err, req, res, next) {
    var code = err.code || 500
    var json = {}
    json.type = err.type || "ERROR_UNKNOWN"
    json.name = err.name || "UNKNOWN"
    json.message = err.message || "Unknown error"
    // json.stack = err.stack || "No stack trace available"
    res.status(code).send({
      error: json
    })
  })

  return router
}

