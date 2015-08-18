var Validator = require('jsonschema').Validator

///
// Common definitions
///

/**
 *
 * @typedef {{
 * id: string,
 * type: string,
 * isPattern: string
 * }} Entity
 */

var entity = {
  type: 'object',
  properties: {
    "type": {type: 'string'},
    "isPattern": {type: 'string'},
    "id": {type: 'string'}
  },
  required: ["type", "isPattern", "id"]
}

var notifyCondition = {
  properties: {
    "type": { type: 'string'},
    "condValues": {
      type: 'array',
      items: { type: 'string'},
    }
  },
  required: ["type", "condValues"]
}

var attribute = {
  type: 'object',
  properties: {
    "name": {type: 'string'},
    "type": {type: 'string'},
    "value": {type: 'string'}
  },
  required: ["name", "type", "value"]
}

var statusCode = {
  type: 'object',
  properties: {
    "code": {type: 'string'},
    "reasonPhrase": {type: 'string'}
  },
  required: ["code", "reasonPhrase"]
}


////
// Validator for POST /QueryContext
////

/**
 *
 * @typedef {{
 * entities: Array.<Entity>,
 * attributes: string[]
 * }} QueryContext
 */


var QueryContextRequest = {
  definitions: {entity: entity},

  type: 'object',
  properties: {
    "entities": {
      type: 'array',
      items: {allOf: [{"$ref": "#/definitions/entity"}]},
      minItems: 1
    },
    "attributes": {
      type: 'array',
      items: {type: 'string'}
    }
  },
  required: ["entities"]
}

var qc = new Validator()
qc.addSchema(QueryContextRequest, '/QueryContextRequest')
exports.QueryContextRequest = {
  validate: function (o) {
    return qc.validate(o, QueryContextRequest)
  }
}

///
// Validator for subscribeContext
///

var SubscribeContextRequest = {
  definitions: {entity: entity, notifyCondition: notifyCondition},

  type: 'object',
  properties: {
    "entities": {
      type: 'array',
      items: {allOf: [{"$ref": "#/definitions/entity"}]},
      minItems: 1
    },
    "attributes": {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
    },
    "reference": { type: 'string'},
    "duration": { type: 'string'},
    "notifyConditions": {
      type: 'array',
      items: {allOf: [{"$ref": "#/definitions/notifyCondition"}]},
      minItems: 1
    }
  },
  required: ["entities", "attributes", "reference", "duration", "notifyConditions"]
}

var sc = new Validator()
sc.addSchema(SubscribeContextRequest, '/SubscribeContextRequest')
exports.SubscribeContextRequest = {
  validate: function (o) {
    return sc.validate(o, SubscribeContextRequest)
  }
}


///
// Validator for notifyContextRequest
///

var contextElement = {
  definitions: {attribute: attribute},

  type: 'object',
  properties: {
    "attributes": {
      type: 'array',
      items: { allOf: [{"$ref": "#/definitions/attribute"}]}
    },
    "type": { type: 'string'},
    "isPattern": { type: 'string'},
    "id": { type: 'string'},
  },
  required: ["attributes", "type", "isPattern", "id"]
}

var contextResponse = {
  definitions: {contextElement: contextElement, statusCode: statusCode},

  type: 'object',
  properties: {
    "contextElement": { "$ref": "#/definitions/contextElement"},
    "statusCode": { "$ref": "#/definitions/statusCode"}
  },
  required: ["contextElement", "statusCode"]
}

var NotifyContextRequest = {
  definitions: {contextResponse: contextResponse},

  type: 'object',
  properties: {
    "subscriptionId": { type: 'string'},
    "originator": { type: 'string'},
    "contextResponses": {
      type: 'array',
      items: { allOf: [{"$ref": "#/definitions/contextResponse"}]}
    }
  },
  required: ["subscriptionId", "originator", "contextResponses"]
}

var ncr = new Validator()
ncr.addSchema(NotifyContextRequest, '/NotifyContextRequest')
exports.NotifyContextRequest = {
  validate: function (o) {
    return ncr.validate(o, NotifyContextRequest)
  }
}

var UpdateContextRequest = {
  definitions: {contextResponse: contextResponse},

  type: 'object',
  properties: {
    "subscriptionId": { type: 'string'},
    "originator": { type: 'string'},
    "contextResponses": {
      type: 'array',
      items: { allOf: [{"$ref": "#/definitions/contextResponse"}]}
    }
  },
  required: ["subscriptionId", "originator", "contextResponses"]
}

var ucr = new Validator()
ucr.addSchema(UpdateContextRequest, '/UpdateContextRequest')
exports.UpdateContextRequest = {
  validate: function (o) {
    return ucr.validate(o, UpdateContextRequest)
  }
}

