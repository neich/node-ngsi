/*
 * Copyright (c) 2013-2015 node-coap contributors.
 *
 * node-coap is licensed under an MIT +no-false-attribs license.
 * All rights not explicitly granted in the MIT license are reserved.
 * See the included LICENSE file for more details.
 */

var NGSI      = require('../')
  , nodi      = require('nodi')
  , http      = require('http')
  , common    = require('./common')
  , assert    = require('chai').assert

describe('request', function() {
  var ctx, ngsi

  beforeEach(function () {
    ctx = nodi.createContext()
    ctx.register('NGSI', NGSI.createHandler, {}).factory(di.factory.func)
    ngsi = NGSI(ctx)
  })

  afterEach(function() {
    ctx = null
    ngsi = null
  })


  it('should raise an exception with default implementation', function (done) {
    return ngsi.start(3000)
      .then(function (server) {
        return common.httpPOST('http://localhost:3000/v1/queryContext', JSON.stringify(common.json.queryContext))
      })
      .then(function (res) {
        assert.property(res, 'data')
        var o = JSON.parse(res.data)
        assert.property(o, 'errorCode')
        assert.property(o.errorCode, 'code')
        assert.equal(o.errorCode.code, '400')
        done()
      })
  })

})