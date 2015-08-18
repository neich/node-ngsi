var express = require('express')
var Promise = require('bluebird')
var uuid = require('uuid')

var util = require('../util')


module.exports = function (dictx) {

  // Obtain the NGSI handler using dependency injection
  var ngsi = dictx.get('NGSI')

  var router = express.Router()

  function queryContext(req, res) {
    util.validate(req.body, 'QueryContextRequest')

    ngsi.queryContext(req.body)
      .then(function (r) {
        var result = {contextResponses: []}
        r.forEach(function (e) {
          var ctx = {statusCode: {code: '200', reasonPhrase: 'OK'}}
          ctx.contextElement = {attributes: []}
          ctx.contextElement.id = e.id
          ctx.contextElement.type = 'TODO'
          ctx.contextElement.isPattern = false
          e.values.forEach(function (val, i) {
            var a = {}
            a.name = req.body.attributes[i]
            a.type = 'string'
            a.value = val
            ctx.contextElement.attributes.push(a)
          })
          result.contextResponses.push(ctx)
        })
        util.jsonResponse(res, result)
      })
      .catch(util.errorResponse.bind(util, res, 400, 'Error querying context'))
  }

  router.post('/v1/queryContext', queryContext)


  function subscribeContext(req, res) {
    util.validate(req.body, 'SubscribeContextRequest')

    var subsId = uuid.v1()
    var subs = {
      subsId: subsId,
      entities: req.body.entities,
      attributes: req.body.attributes,
      reference: req.body.reference,
      duration: req.body.duration,
      notifyConditions: req.body.notifyConditions
    }

    ngsi.subscribeContext(subs)
      .then(function (s) {
        util.jsonResponse(res, s)
      })
      .catch(util.errorResponse.bind(util, res, 400, 'Error subcribing to context'))
  }

  router.post('/v1/subscribeContext', subscribeContext)


  function unsusbcribeContext(req, res) {
    util.validate(req.body, 'UnsubscribeContextRequest')

    return Promise.resolve('Cannot do subscription')
  }

  return router
}
