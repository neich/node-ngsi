var Promise = require('bluebird')
var express = require('express')
var bodyParser = require('body-parser');
var router = require('./lib/router')

/**
 *
 * @param ctx This is a dependency injection contex produces by nodi (https://www.npmjs.com/package/nodi)
 */
module.exports = function (ctx) {

  var app = express()
  app.use(bodyParser.json());
  app.use(router(ctx))

  var NGSI = {}

  NGSI.start = function (port) {
    return new Promise(function (resolve, reject) {
      var server = app.listen(port, function (err) {
        if (!err) {
          resolve(server)
        } else {
          reject(err)
        }
      })
    })

  }

  return NGSI
}
