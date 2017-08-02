/**
 * Created by sargis on 7/3/17.
 */
/** A Multiton Model implementation.
 *
 * In PureMVC, the Model class provides
 * access to model objects (Proxies) by named lookup.
 *
 * The Model assumes these responsibilities:
 *
 * - Maintain a cache of {@link puremvc.Proxy Proxy}
 *   instances.
 * - Provide methods for registering, retrieving, and removing
 *   {@link puremvc.Proxy Proxy} instances.
 *
 * Your application must register
 * {@link puremvc.Proxy Proxy} instances with the Model.
 * Typically, you use a
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or
 * {@link puremvc.MacroCommand MacroCommand}
 * to create and register Proxy instances once the Facade has initialized the
 * *Core* actors.
 *
 * This Model implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the
 * {@link #getInstance static Multiton Factory method}
 * @constructor
 * @param {string} key
 *  The Models multiton key
 * @throws {Error}
 *  An error is thrown if this multitons key is already in use by another instance
 */
export default class Model {
  static instanceMap = new Map()

  constructor (key) {
    if (Model.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG)
    }

    this.multitonKey = key
    this.proxyMap = new Map()
    this.initializeModel()
  }

  /**
   * Model Multiton Factory method.
   * Note that this method will return null if supplied a null
   * or undefined multiton key.
   *
   * @param {string} key
   *  The multiton key for the Model to retrieve
   * @return {puremvc.Model}
   *  the instance for this Multiton key
   */
  static getInstance (key) {
    if (!key) { return null }

    if (!this.instanceMap.has(key)) {
      this.instanceMap.set(key, new Model(key))
    }

    return this.instanceMap.get(key)
  }

  /**
   * Initialize the Model instance.
   *
   * Called automatically by the constructor, this
   * is your opportunity to initialize the Singleton
   * instance in your subclass without overriding the
   * constructor.
   *
   * @return void
   */
  initializeModel () {}

  /**
   * Register a Proxy with the Model
   * @param {puremvc.Proxy}
   */
  registerProxy (proxy) {
    proxy.initializeNotifier(this.multitonKey)
    this.proxyMap.set(proxy.getProxyName(), proxy)
    proxy.onRegister()
  }

  /**
   * Retrieve a Proxy from the Model
   *
   * @param {string} proxyName
   * @return {puremvc.Proxy}
   *  The Proxy instance previously registered with the provided proxyName
   */
  retrieveProxy (proxyName) {
    return this.proxyMap.get(proxyName)
  }

  /**
   * Check if a Proxy is registered
   * @param {string} proxyName
   * @return {boolean}
   *  whether a Proxy is currently registered with the given proxyName.
   */
  hasProxy (proxyName) {
    return this.proxyMap.has(proxyName)
  }

  /**
   * Remove a Proxy from the Model.
   *
   * @param {string} proxyName
   *  The name of the Proxy instance to remove
   * @return {puremvc.Proxy}
   *  The Proxy that was removed from the Model
   */
  removeProxy (proxyName) {
    if (this.proxyMap.has(proxyName)) {
      const proxy = this.proxyMap.get(proxyName)
      proxy.onRemove()
      this.proxyMap.delete(proxyName)
      return proxy
    }
    return null
  }

  /**
   * @static
   * Remove a Model instance.
   *
   * @param {string} key
   * @return {void}
   */
  static removeModel (key) {
    this.instanceMap.delete(key)
  }
}

const MULTITON_MSG = 'Model instance for this Multiton key already constructed!'
