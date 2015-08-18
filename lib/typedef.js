// Subscription

/**
 *
 * @typedef {{
   * type: string,
   * condValues: Array.<string>
   * }} NotifyCondition
 *
 */

/**
 *
 * @typedef {{
 * id: string,
 * devs : Array.<Device>,
 * attributes: Array.<string>,
 * reference: string,
 * notifyConditions: Array.<NotifyCondition>
 * }} Subscription
 */


// Device

/**
 *
 * @typedef {{
   * title: string,
   * type: string,
   * observable: boolean
   * value: string
   * }} DevAttribute
 */

/**
 *
 * @typedef {{
   * ip: string,
   * attributes: Array.<DevAttribute>
   * }} Device
 *
 */


/**
 * @typedef {{
 * id: string,
 * values: Array.<string>
 * }} QueryDeviceResult
 */


/**
 * @typedef {{
 * duration: string,
 * subscriptionId: string,
 * throttling: string
 * }} SubscribeContextResponse
 */
