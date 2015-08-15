var EventEmitter = require('events').EventEmitter
var Promise = require('bluebird')

function asynEmitter() {
  var emitter = new EventEmitter()
  var aemitter = Object.create(emitter)

  aemitter.emit = function (event) {
    setImmediate(function () {
      emitter.emit.apply(null, [event].concat(Array.prototype.slice.call(arguments)))
    })
  }
  return aemitter
}

function wrapHandlerFunc(handler, impl, fname) {
  handler[fname] = function () {
    var args = Array.prototype.slice.call(arguments)
    handler.emit.apply(handler, [fname + ':start'].concat(arguments))
    if (impl.hasOwnProperty(fname)) {
      impl.apply(impl, args)
        .then(function (res) {
          handler.emit.apply(handler, [fname + ':start', res])
          return Promise.resolve(res)
        })
        .catch(function (e) {
          handler.emit.apply(handler, [fname + ':end', e])
          return Promise.reject(e)
        })
    } else {
      handler.emit('setDevice:end')
      return Promise.reject(new Error('Method <' + fname + '> not implemented in handler'))
    }
  }
}


exports.wrapHandler = function (handler, impl) {
  Object.keys(handler).forEach(function (k) {
    if (typeof [k] === 'function') {
      wrapHandlerFunc(handler, impl, k)
    }
  })

}