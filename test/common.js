var Promise = require('bluebird')
var http = require('http')

exports.httpGET = function (url) {

  var urlParsed = require('url').parse(url)

  var options = {
    hostname: urlParsed.hostname,
    port: urlParsed.port,
    path: urlParsed.pathname,
    method: 'GET'
  }

  return new Promise(function (resolve, reject) {
    var req = http.request(options, function (res) {
      res.on('data', function () {
      })
      res.on('end', function () {
        resolve()
      })
    })
    req.on('error', function (e) {
      reject(e)
    })
    req.end()
  })
}

exports.httpPOST = function (url, data) {

  var urlParsed = require('url').parse(url)

  var options = {
    hostname: urlParsed.hostname,
    port: urlParsed.port,
    path: urlParsed.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data, 'utf8')
    }
  }

  return new Promise(function (resolve, reject) {
    var req = http.request(options, function (res) {
      var result = ''
      res.on('data', function (chunk) {
        result += chunk
      })
      res.on('end', function () {
        resolve({ status: res.statusCode, data: result})
      })
    })
    req.on('error', function (e) {
      reject(e)
    })
    req.write(data)
    req.end()
  })
}

exports.json =  {
  queryContext: {
    "entities": [
      {
        "type": "Room",
        "isPattern": "false",
        "id": "Room1"
      }
    ]
  }
}