var Promise = require('bluebird')
var express = require('express')
var bodyParser = require('body-parser');

var router = require.main.require('./ngsi/router')

var app = express()
app.use(bodyParser.json());
app.use(router)

NGSI = {}

NGSI.start = function (port) {
  return new Promise(function (resolve, reject) {
    app.listen(port, function (err) {
      if (!err) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}

module.exports = NGSI

