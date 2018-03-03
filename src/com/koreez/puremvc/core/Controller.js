/**
 * Created by sargis on 7/3/17.
 */
import View from './View'
/**
 * @constructor
 * This Controller implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static #getInstance factory method,
 * passing the unique key for this instance to it.
 * @param {string} key
 * @throws {Error}
 *  If instance for this Multiton key has already been constructed
 */
export default class Controller {
  static instanceMap = new Map()

  constructor (key) {
    if (Controller.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG)
    }

    this.multitonKey = key
    this.commandMap = new Map()
    this.initializeController()
  }

  /**
   * The Controllers multiton factory method.
   * Note that this method will return null if supplied a null
   * or undefined multiton key.
   *
   * @param {string} key
   *  A Controller's multiton key
   * @return {puremvc.Controller}
   *  the Multiton instance of Controller
   */
  static getInstance (key) {
    if (!key) {
      return null
    }

    if (!this.instanceMap.has(key)) {
      this.instanceMap.set(key, new Controller(key))
    }

    return this.instanceMap.get(key)
  }

  /**
   * @protected
   *
   * Initialize the multiton Controller instance.
   *
   * Called automatically by the constructor.
   *
   * Note that if you are using a subclass of View
   * in your application, you should *also* subclass Controller
   * and override the initializeController method in the
   * following way.
   *
   * @return {void}
   */
  initializeController () {
    this.view = View.getInstance(this.multitonKey)
  }

  /**
   * If a SimpleCommand or MacroCommand has previously been registered to handle
   * the given Notification then it is executed.
   *
   * @param {puremvc.Notification} note
   * @return {void}
   */
  executeCommand (notificationName, ...args) {
    const commandClassRef = this.commandMap.get(notificationName)
    if (!commandClassRef) {
      return
    }
    // eslint-disable-next-line
    const commandInstance = new commandClassRef()
    commandInstance.initializeNotifier(this.multitonKey)
    commandInstance.execute(notificationName, ...args)
  }

  /**
   * Register a particular SimpleCommand or MacroCommand class as the handler for
   * a particular Notification.
   *
   * If an command already been registered to handle Notifications with this name,
   * it is no longer used, the new command is used instead.
   *
   * The Observer for the new command is only created if this the irst time a
   * command has been regisered for this Notification name.
   *
   * @param {string} notificationName
   *  the name of the Notification
   * @param {Function} commandClassRef
   *  a command constructor
   * @return {void}
   */
  registerCommand (notificationName, commandClassRef) {
    if (!this.commandMap.has(notificationName)) {
      this.view.registerObserver(notificationName, this.executeCommand, this)
    }
    this.commandMap.set(notificationName, commandClassRef)
  }

  /**
   * Check if a command is registered for a given Notification
   *
   * @param {string} notificationName
   * @return {boolean}
   *  whether a Command is currently registered for the given notificationName.
   */
  hasCommand (notificationName) {
    return this.commandMap.has(notificationName)
  }

  /**
   * Remove a previously registered command to
   * {@link puremvc.Notification Notification}
   * mapping.
   *
   * @param {string} notificationName
   *  the name of the Notification to remove the command mapping for
   * @return {void}
   */
  removeCommand (notificationName) {
    if (this.hasCommand(notificationName)) {
      this.view.removeObserver(notificationName, this)
      this.commandMap.delete(notificationName)
    }
  }

  /**
   * @static
   * Remove a Controller instance.
   *
   * @param {string} key
   *  multitonKey of Controller instance to remove
   * @return {void}
   */
  static removeController (key) {
    this.instanceMap.delete(key)
  }
}

const MULTITON_MSG = 'controller key for this Multiton key already constructed'
