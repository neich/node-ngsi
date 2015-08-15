var jv = require('../schema_validator')

exports.jsonResponse = function (res, obj) {
  res.status(200).json(obj || {message: 'ok'});
};

exports.errorResponse = function (res, code, reason, prevErr) {
  var err =  prevErr ? reason + ' (' + prevErr.message + ')' : reason
  res.status(200).json({
    errorCode: {
      code: code,
      reasonPhrase: err
    }
  })
}

exports.throwError = function (code, reason, prevErr) {
  var err =  prevErr ? new Error(reason + ' (' + prevErr.message + ')') : new Error(reason)
  err.code = code
  throw err
}

exports.log = function(msg) {
  console.log(msg)
}

exports.logError = function(msg, err) {
  var emsg = typeof err == 'string' ? err : err.message + '\n' + err.stack
  console.log(msg + ': ' + emsg)
}

exports.validate = function(o, schema) {
  var validator = jv[schema]
  if (!validator) throw new Error('Unknown JSON validator schema: ' + schema)
  var v = validator.validate(o)
  if (v.errors.length > 0) {
    exports.throwError(400, v.errors.map(function(e) { return e.stack}).join(' => '))
  }
}

var error = {
  ERR_MALFORMED_REQUEST: 'ERR_MALFORMED_REQUEST',
  ERR_MISSING_PARAMETER: 'ERR_MISSING_PARAMETER',
  ERR_AUTHENTICATION: 'ERR_AUTHENTICATION',
  ERR_ENTITY_NOT_FOUND: 'ERR_ENTITY_NOT_FOUND',
  ERR_ENTITY_EXISTS: 'ERR_ENTITY_EXISTS',
  ERR_TRANSACTION: 'ERR_DB_TRANSACTION',
  ERR_UNKNOWN: 'ERR_UNKNOWN',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
}

exports.Error = error;
