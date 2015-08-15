var Promise = require('bluebird')
var hutil = require('../hutil')

function defaultImpl() {
  return Promise.reject(new Error('Handler function not implemented'))
}

module.exports = function (impl) {

  var registry = hutil.createBaseHandler()

  /**
   *
   * @param id {string}
   * @param dev {Device}
   * @returns {Promise.<Device>}
   */
  registry.setDevice = defaultImpl

  /**
   *
   * @param ip {string}
   * @returns {Promise.<Device>}
   */
  registry.getDevice = defaultImpl

  /**
   *
   * @param k {string}
   * @returns {Promise.<boolean>}
   */
  registry.hasDevice = defaultImpl

  /**
   * @returns {Promise.<Array.<Device>>}
   */
  registry.devices = defaultImpl

  /**
   *
   * @param subsId {string}
   * @param devs {Array.<Device>}
   * @param attrs {Array}
   * @param reference {string}
   * @param notifyConditions {Array}
   * @retuns {Promise.<Subscription>}
   */
  registry.addSubscription = defaultImpl

  /**
   *
   * @param subsId {string}
   * @returns {Promise.<Subscription>}
   */
  registry.getSubscription = defaultImpl

  /**
   *
   * @param subsId {string}
   * @returns {Promise.<string>}
   */
  registry.removeSusbcription = defaultImpl

  /**
   *
   * @param  {Subscription} sub
   * @returns {Promise.<Subscription>}
   */
  registry.updateSubscription = defaultImpl

  return hutil.wrapHandler(registry, impl)
}