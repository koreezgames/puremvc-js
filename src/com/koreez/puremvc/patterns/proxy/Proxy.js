/**
 * Created by sargis on 7/4/17.
 */
import Notifier from '../observer/Notifier'

/**
 * A base Proxy implementation.
 *
 * In PureMVC, Proxy classes are used to manage parts of the application's data
 * model.
 *
 * A Proxy might simply manage a reference to a local data object, in which case
 * interacting with it might involve setting and getting of its data in
 * synchronous fashion.
 *
 * Proxy classes are also used to encapsulate the application's interaction with
 * remote services to save or retrieve data, in which case, we adopt an
 * asyncronous idiom; setting data (or calling a method) on the Proxy and
 * listening for a
 * {@link puremvc.Notification Notification}
 * to be sent  when the Proxy has retrieved the data from the service.
 *
 *
 * @param {string} [proxyName]
 *  The Proxy's name. If none is provided, the Proxy will use its constructors
 *  NAME property.
 * @param {Object} [data]
 *  The Proxy's data object
 * @constructor
 */
export default class Proxy extends Notifier {
  constructor (proxyName, data) {
    super()
    this.proxyName = proxyName || NAME
    if (data) {
      this.setData(data)
    }
  }

  /**
   * Get the Proxy's name.
   *
   * @return {string}
   */
  getProxyName () {
    return this.proxyName
  }

  /**
   * Set the Proxy's data object
   *
   * @param {Object} data
   * @return {void}
   */
  setData (data) {
    this.data = data
  }

  /**
   * Get the Proxy's data object
   *
   * @return {Object}
   */
  getData () {
    return this.data
  }

  /**
   * Called by the {@link puremvc.Model Model} when
   * the Proxy is registered.
   *
   * @return {void}
   */
  onRegister () {}

  /**
   * Called by the {@link puremvc.Model Model} when
   * the Proxy is removed.
   *
   * @return {void}
   */
  onRemove () {}
}

const NAME = 'Proxy'
