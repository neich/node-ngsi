var Promise = require('bluebird')
var express = require('express')
var bodyParser = require('body-parser');
var router = require('./lib/router')
var handlerFactory = require('./lib/handler/ngsi_handler')
/**
 *
 * @param ctx This is a dependency injection contex produces by nodi (https://www.npmjs.com/package/nodi)
 */
var NGSI =  function () {

  var ngsi = {}
  ngsi.dependecies = "ngsiHandler=NGSIHandler"

  var app = express()
  app.use(bodyParser.json());
  app.use(router())


  ngsi.start = function (port) {
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


  return ngsi
}

NGSI.createHandler = function (impl) {
  return handlerFactory(impl)
}

module.exports = NGSI