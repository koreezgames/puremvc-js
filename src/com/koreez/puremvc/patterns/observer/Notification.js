/**
 * Created by sargis on 7/4/17.
 */
/**
 * A base Notification implementation.
 *
 * PureMVC does not rely upon underlying event models such as the one provided
 * with the DOM or other browser centric W3C event models.
 *
 * The Observer Pattern as implemented within PureMVC exists to support
 * event-driven communication between the application and the actors of the MVC
 * triad.
 *
 * Notifications are not meant to be a replacement for events in the browser.
 * Generally, Mediator implementors place event listeners on their view
 * components, which they then handle in the usual way. This may lead to the
 * broadcast of Notifications to trigger commands or to communicate with other
 * Mediators. {@link puremvc.Proxy Proxy},
 * {@link puremvc.SimpleCommand SimpleCommand}
 * and {@link puremvc.MacroCommand MacroCommand}
 * instances communicate with each other and
 * {@link puremvc.Mediator Mediator}s
 * by broadcasting Notifications.
 *
 * A key difference between browser events and PureMVC Notifications is that
 * events follow the 'Chain of Responsibility' pattern, 'bubbling' up the
 * display hierarchy until some parent component handles the event, while
 * PureMVC Notification follow a 'Publish/Subscribe' pattern. PureMVC classes
 * need not be related to each other in a parent/child relationship in order to
 * communicate with one another using Notifications.
 *
 * @constructor
 * @param {string} name
 *  The Notification name
 * @param {Object} [body]
 *  The Notification body
 * @param {Object} [type]
 *  The Notification type
 */
export default class Notification {
  constructor (name, body, type) {
    this.name = name
    this.body = body
    this.type = type
  }

  /**
   * Get the name of the Notification instance
   *
   * @return {string}
   *  The name of the Notification instance
   */
  getName () {
    return this.name
  }

  /**
   * Set this Notifications body.
   * @param {Object} body
   * @return {void}
   */
  setBody (body) {
    this.body = body
  }

  /**
   * Get the Notification body.
   *
   * @return {Object}
   */
  getBody () {
    return this.body
  }

  /**
   * Set the type of the Notification instance.
   *
   * @param {Object} type
   * @return {void}
   */
  setType (type) {
    this.type = type
  }

  /**
   * Get the type of the Notification instance.
   *
   * @return {Object}
   */
  getType () {
    return this.type
  }

  /**
   * Get a string representation of the Notification instance
   *
   * @return {string}
   */
  toString () {
    let msg = 'Notification Name: ' + this.getName()
    msg += '\nBody:' + (this.body ? 'null' : this.body.toString())
    msg += '\nType:' + (this.type ? 'null' : this.type)
    return msg
  }
}
