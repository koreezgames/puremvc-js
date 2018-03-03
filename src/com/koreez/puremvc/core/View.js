/**
 * Created by sargis on 7/4/17.
 */

// import Observer from '../patterns/observer/Observer'
import EventEmitter from 'eventemitter3'
/**
 * This View implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static Multiton
 * Factory #getInstance method.
 *
 * @param {string} key
 * @constructor
 * @throws {Error}
 *  if instance for this Multiton key has already been constructed
 */
export default class View {
  static instanceMap = new Map()

  constructor (key) {
    if (View.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG)
    }

    this.multitonKey = key
    this.mediatorMap = new Map()
    this.observerMap = new Map()
    this.eventEmitter = new EventEmitter()
    this.initializeView()
  }

  /**
   * View Singleton Factory method.
   * Note that this method will return null if supplied a null
   * or undefined multiton key.
   *
   * @return {puremvc.View}
   *  The Singleton instance of View
   */
  static getInstance (key) {
    if (!key) {
      return null
    }

    if (!this.instanceMap.has(key)) {
      this.instanceMap.set(key, new View(key))
    }

    return this.instanceMap.get(key)
  }

  /**
   * @protected
   * Initialize the Singleton View instance
   *
   * Called automatically by the constructor, this is your opportunity to
   * initialize the Singleton instance in your subclass without overriding the
   * constructor
   *
   * @return {void}
   */
  initializeView () { }

  /**
   * Register an Observer to be notified of Notifications with a given name
   *
   * @param {string} notificationName
   *  The name of the Notifications to notify this Observer of
   * @param {puremvc.Observer} observer
   *  The Observer to register.
   * @return {void}
   */
  registerObserver (notificationName, observerMethod, context) {
    this.eventEmitter.on(notificationName, observerMethod, context)
  }

  /**
   * Notify the Observersfor a particular Notification.
   *
   * All previously attached Observers for this Notification's
   * list are notified and are passed a reference to the INotification in
   * the order in which they were registered.
   *
   * @param {puremvc.Notification} notification
   *  The Notification to notify Observers of
   * @return {void}
   */
  notifyObservers (notificationName, ...args) {
    this.eventEmitter.emit(notificationName, notificationName, ...args)
  }

  /**
   * Remove the Observer for a given notifyContext from an observer list for
   * a given Notification name
   *
   * @param {string} notificationName
   *  Which observer list to remove from
   * @param {Object} notifyContext
   *  Remove the Observer with this object as its notifyContext
   * @return {void}
   */
  removeObserver (notificationName, observerMethod, context) {
    this.eventEmitter.removeListener(notificationName, observerMethod, context)
  }

  /**
   * Register a Mediator instance with the View.
   *
   * Registers the Mediator so that it can be retrieved by name,
   * and further interrogates the Mediator for its
   * {@link puremvc.Mediator#listNotificationInterests interests}.
   *
   * If the Mediator returns any Notification
   * names to be notified about, an Observer is created encapsulating
   * the Mediator instance's
   * {@link puremvc.Mediator#handleNotification handleNotification}
   * method and registering it as an Observer for all Notifications the
   * Mediator is interested in.
   *
   * @param {puremvc.Mediator}
   *  a reference to the Mediator instance
   */
  registerMediator (mediator) {
    if (this.mediatorMap.has(mediator.getMediatorName())) {
      return
    }

    mediator.initializeNotifier(this.multitonKey)
    // register the mediator for retrieval by name
    this.mediatorMap.set(mediator.getMediatorName(), mediator)

    // get notification interests if any
    const interests = mediator.listNotificationInterests()

    // register mediator as an observer for each notification
    if (interests.length > 0) {
      for (let i = 0; i < interests.length; i++) {
        this.registerObserver(
          interests[i],
          mediator.handleNotification,
          mediator
        )
      }
    }

    mediator.onRegister()
  }

  /**
   * Retrieve a Mediator from the View
   *
   * @param {string} mediatorName
   *  The name of the Mediator instance to retrieve
   * @return {puremvc.Mediator}
   *  The Mediator instance previously registered with the given mediatorName
   */
  retrieveMediator (mediatorName) {
    return this.mediatorMap.get(mediatorName)
  }

  /**
   * Remove a Mediator from the View.
   *
   * @param {string} mediatorName
   *  Name of the Mediator instance to be removed
   * @return {puremvc.Mediator}
   *  The Mediator that was removed from the View
   */
  removeMediator (mediatorName) {
    const mediator = this.mediatorMap.get(mediatorName)
    if (mediator) {
      // for every notification the mediator is interested in...
      const interests = mediator.listNotificationInterests()
      for (let i = 0; i < interests.length; i++) {
        // remove the observer linking the mediator to the notification
        // interest
        this.removeObserver(interests[i], mediator.handleNotification, mediator)
      }

      // remove the mediator from the map
      this.mediatorMap.delete(mediatorName)

      // alert the mediator that it has been removed
      mediator.onRemove()
    }

    return mediator
  }

  /**
   * Check if a Mediator is registered or not.
   *
   * @param {string} mediatorName
   * @return {boolean}
   *  Whether a Mediator is registered with the given mediatorname
   */
  hasMediator (mediatorName) {
    return this.mediatorMap.has(mediatorName)
  }

  /**
   * Remove a View instance
   *
   * @return {void}
   */
  static removeView = function (key) {
    this.instanceMap.delete(key)
  }
}

const MULTITON_MSG = 'View instance for this Multiton key already constructed!'
