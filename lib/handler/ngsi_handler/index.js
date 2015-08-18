var Promise = require('bluebird')
var hutil = require('../hutil')

/**
 *
 * @param impl {Object} hander implementation
 */
module.exports = function (impl) {

  var ngsi = hutil.createBaseHandler()

  /**
   *
   * @param {Device} dev
   * @param {string[]} attributes
   * @returns {Promise.<QueryDeviceResult>}
   */
  ngsi.queryDevice = hutil.defaultImpl

  /**
   *
   * @param {Entity} e
   * @param {string[]} attributes
   * @returns {Promise.<QueryDeviceResult>}
   */
  ngsi.queryEntity = hutil.defaultImpl

  /**
   *
   * @param {QueryContext} ctx
   * @returns {Array.<Promise.<QueryDeviceResult>>}
   */
  ngsi.queryContext = hutil.defaultImpl

  /**
   *
   * @param {Subscription} sub
   * @returns {Promise.<SubscribeContextResponse>}
   */
  ngsi.subscribeContext = hutil.defaultImpl

  /**
   *
   * @param subsId {string}
   * @returns Promise.<string>
   */
  ngsi.unsubscribeContext = hutil.defaultImpl

  return ngsi
}
