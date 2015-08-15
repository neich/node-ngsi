var di = require.main.require('nodi')
var express = require('express')

var router = module.exports = express.Router()

router.use(require('./op_resources'))
router.use(function (err, req, res, next) {
  var code = err.code || 500;
  var json = {};
  json.type = err.type || "ERROR_UNKNOWN";
  json.name = err.name || "UNKNOWN";
  json.message = err.message || "Unknown error";
  // json.stack = err.stack || "No stack trace available";
  res.status(code).send({
    error: json
  });
});

