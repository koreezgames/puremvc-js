(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("library", [], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory();
	else
		root["library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/observer/Notifier.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Facade = __webpack_require__(/*! ../facade/Facade */ 6);

var _Facade2 = _interopRequireDefault(_Facade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Base Notifier implementation.
 *
 * {@link puremvc.MacroCommand MacroCommand},
 * {@link puremvc.SimpleCommand SimpleCommand},
 * {@link puremvc.Mediator Mediator} and
 * {@link puremvc.Proxy Proxy}
 * all have a need to send Notifications
 *
 * The Notifier interface provides a common method called #sendNotification that
 * relieves implementation code of the necessity to actually construct
 * Notifications.
 *
 * The Notifier class, which all of the above mentioned classes
 * extend, provides an initialized reference to the
 * {@link puremvc.Facade Facade}
 * Multiton, which is required for the convienience method
 * for sending Notifications but also eases implementation as these
 * classes have frequent
 * {@link puremvc.Facade Facade} interactions
 * and usually require access to the facade anyway.
 *
 * NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey.
 *
 * The multitonKey is set:
 *   - on a Command when it is executed by the Controller
 *   - on a Mediator is registered with the View
 *   - on a Proxy is registered with the Model.
 *
 * @constructor
 */
var Notifier = function () {
  function Notifier() {
    _classCallCheck(this, Notifier);
  }

  _createClass(Notifier, [{
    key: 'initializeNotifier',

    /**
     * Initialize this Notifier instance.
     *
     * This is how a Notifier gets its multitonKey.
     * Calls to #sendNotification or to access the
     * facade will fail until after this method
     * has been called.
     *
     * Mediators, Commands or Proxies may override
     * this method in order to send notifications
     * or access the Multiton Facade instance as
     * soon as possible. They CANNOT access the facade
     * in their constructors, since this method will not
     * yet have been called.
     *
     *
     * @param {string} key
     *  The Notifiers multiton key;
     * @return {void}
     */
    value: function initializeNotifier(key) {
      this.multitonKey = key;
      this.facade = this.getFacade();
    }

    /**
     * Create and send a Notification.
     *
     * Keeps us from having to construct new Notification instances in our
     * implementation code.
     *
     * @param {string} notificationName
     *  A notification name
     * @param {Object} [body]
     *  The body of the notification
     * @param {string} [type]
     *  The notification type
     * @return {void}
     */

  }, {
    key: 'sendNotification',
    value: function sendNotification(notificationName, body, type) {
      if (this.facade) {
        this.facade.sendNotification(notificationName, body, type);
      }
    }

    /**
     * Retrieve the Multiton Facade instance
     *
     *
     * @protected
     * @return {puremvc.Facade}
     */

  }, {
    key: 'getFacade',
    value: function getFacade() {
      if (this.multitonKey === null) {
        throw new Error(MULTITON_MSG);
      }

      return _Facade2.default.getInstance(this.multitonKey);
    }
  }]);

  return Notifier;
}();

exports.default = Notifier;


var MULTITON_MSG = 'multitonKey for this Notifier not yet initialized!';
module.exports = exports['default'];

/***/ }),
/* 1 */
/*!**************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/observer/Observer.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sargis on 7/4/17.
 */

/**
 * A base Observer implementation.
 *
 * An Observer is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular Notification is broadcast.
 *
 * In PureMVC, the Observer class assumes these responsibilities:
 *
 * - Encapsulate the notification (callback) method of the interested object.
 * - Encapsulate the notification context (this) of the interested object.
 * - Provide methods for setting the notification method and context.
 * - Provide a method for notifying the interested object.
 *
 *
 * The notification method on the interested object should take
 * one parameter of type Notification.
 *
 *
 * @param {Function} notifyMethod
 *  the notification method of the interested object
 * @param {Object} notifyContext
 *  the notification context of the interested object
 * @constructor
 */
var Observer = function () {
  function Observer(notifyMethod, notifyContext) {
    _classCallCheck(this, Observer);

    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
  }

  /**
   * Set the Observers notification method.
   *
   * The notification method should take one parameter of type Notification
   * @param {Function} notifyMethod
   *  the notification (callback) method of the interested object.
   * @return {void}
   */


  _createClass(Observer, [{
    key: "setNotifyMethod",
    value: function setNotifyMethod(notifyMethod) {
      this.notify = notifyMethod;
    }

    /**
     * Set the Observers notification context.
     *
     * @param {Object} notifyContext
     *  the notification context (this) of the interested object.
     *
     * @return {void}
     */

  }, {
    key: "setNotifyContext",
    value: function setNotifyContext(notifyContext) {
      this.context = notifyContext;
    }

    /**
     * Get the Function that this Observer will invoke when it is notified.
     *
     * @private
     * @return {Function}
     */

  }, {
    key: "getNotifyMethod",
    value: function getNotifyMethod() {
      return this.notify;
    }

    /**
     * Get the Object that will serve as the Observers callback execution context
     *
     * @private
     * @return {Object}
     */

  }, {
    key: "getNotifyContext",
    value: function getNotifyContext() {
      return this.context;
    }

    /**
     * Notify the interested object.
     *
     * @param {puremvc.Notification} notification
     *  The Notification to pass to the interested objects notification method
     * @return {void}
     */

  }, {
    key: "notifyObserver",
    value: function notifyObserver(notification) {
      this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }

    /**
     * Compare an object to this Observers notification context.
     *
     * @param {Object} object
     *
     * @return {boolean}
     */

  }, {
    key: "compareNotifyContext",
    value: function compareNotifyContext(object) {
      return object === this.context;
    }
  }]);

  return Observer;
}();

exports.default = Observer;
module.exports = exports["default"];

/***/ }),
/* 2 */
/*!*********************************************!*\
  !*** ./src/com/koreez/puremvc/core/View.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Observer = __webpack_require__(/*! ../patterns/observer/Observer */ 1);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var View = function () {
  function View(key) {
    _classCallCheck(this, View);

    if (View.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG);
    }

    this.multitonKey = key;
    this.mediatorMap = new Map();
    this.observerMap = new Map();
    this.initializeView();
  }

  /**
   * View Singleton Factory method.
   * Note that this method will return null if supplied a null
   * or undefined multiton key.
   *
   * @return {puremvc.View}
   *  The Singleton instance of View
   */


  _createClass(View, [{
    key: 'initializeView',


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
    value: function initializeView() {}

    /**
     * Register an Observer to be notified of Notifications with a given name
     *
     * @param {string} notificationName
     *  The name of the Notifications to notify this Observer of
     * @param {puremvc.Observer} observer
     *  The Observer to register.
     * @return {void}
     */

  }, {
    key: 'registerObserver',
    value: function registerObserver(notificationName, observer) {
      if (this.observerMap.has(notificationName)) {
        this.observerMap.get(notificationName).push(observer);
      } else {
        this.observerMap.set(notificationName, [observer]);
      }
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

  }, {
    key: 'notifyObservers',
    value: function notifyObservers(notification) {
      // SIC
      if (this.observerMap.has(notification.getName())) {
        var i = void 0;
        var observers = this.observerMap.get(notification.getName());
        var observersBuffer = [];
        var observer = void 0;

        for (i = 0; i < observers.length; ++i) {
          observer = observers[i];
          observersBuffer.push(observer);
        }

        for (i = 0; i < observersBuffer.length; ++i) {
          observer = observersBuffer[i];
          observer.notifyObserver(notification);
        }
      }
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

  }, {
    key: 'removeObserver',
    value: function removeObserver(notificationName, notifyContext) {
      // SIC
      var observers = this.observerMap.get(notificationName);
      for (var i = 0; i < observers.length; i++) {
        if (observers[i].compareNotifyContext(notifyContext) === true) {
          observers.splice(i, 1);
          break;
        }
      }

      if (observers.length === 0) {
        this.observerMap.delete(notificationName);
      }
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

  }, {
    key: 'registerMediator',
    value: function registerMediator(mediator) {
      if (this.mediatorMap.has(mediator.getMediatorName())) {
        return;
      }

      mediator.initializeNotifier(this.multitonKey);
      // register the mediator for retrieval by name
      this.mediatorMap.set(mediator.getMediatorName(), mediator);

      // get notification interests if any
      var interests = mediator.listNotificationInterests();

      // register mediator as an observer for each notification
      if (interests.length > 0) {
        // create observer referencing this mediators handleNotification method
        var observer = new _Observer2.default(mediator.handleNotification, mediator);
        for (var i = 0; i < interests.length; i++) {
          this.registerObserver(interests[i], observer);
        }
      }

      mediator.onRegister();
    }

    /**
     * Retrieve a Mediator from the View
     *
     * @param {string} mediatorName
     *  The name of the Mediator instance to retrieve
     * @return {puremvc.Mediator}
     *  The Mediator instance previously registered with the given mediatorName
     */

  }, {
    key: 'retrieveMediator',
    value: function retrieveMediator(mediatorName) {
      return this.mediatorMap.get(mediatorName);
    }

    /**
     * Remove a Mediator from the View.
     *
     * @param {string} mediatorName
     *  Name of the Mediator instance to be removed
     * @return {puremvc.Mediator}
     *  The Mediator that was removed from the View
     */

  }, {
    key: 'removeMediator',
    value: function removeMediator(mediatorName) {
      var mediator = this.mediatorMap.get(mediatorName);
      if (mediator) {
        // for every notification the mediator is interested in...
        var interests = mediator.listNotificationInterests();
        for (var i = 0; i < interests.length; i++) {
          // remove the observer linking the mediator to the notification
          // interest
          this.removeObserver(interests[i], mediator);
        }

        // remove the mediator from the map
        this.mediatorMap.delete(mediatorName);

        // alert the mediator that it has been removed
        mediator.onRemove();
      }

      return mediator;
    }

    /**
     * Check if a Mediator is registered or not.
     *
     * @param {string} mediatorName
     * @return {boolean}
     *  Whether a Mediator is registered with the given mediatorname
     */

  }, {
    key: 'hasMediator',
    value: function hasMediator(mediatorName) {
      return this.mediatorMap.has(mediatorName);
    }

    /**
     * Remove a View instance
     *
     * @return {void}
     */

  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (!key) {
        return null;
      }

      if (!this.instanceMap.has(key)) {
        this.instanceMap.set(key, new View(key));
      }

      return this.instanceMap.get(key);
    }
  }]);

  return View;
}();

View.instanceMap = new Map();

View.removeView = function (key) {
  this.instanceMap.delete(key);
};

exports.default = View;


var MULTITON_MSG = 'View instance for this Multiton key already constructed!';
module.exports = exports['default'];

/***/ }),
/* 3 */
/*!***************************************************!*\
  !*** ./src/com/koreez/puremvc/core/Controller.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by sargis on 7/3/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Observer = __webpack_require__(/*! ../patterns/observer/Observer */ 1);

var _Observer2 = _interopRequireDefault(_Observer);

var _View = __webpack_require__(/*! ./View */ 2);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constructor
 * This Controller implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static #getInstance factory method,
 * passing the unique key for this instance to it.
 * @param {string} key
 * @throws {Error}
 *  If instance for this Multiton key has already been constructed
 */
var Controller = function () {
  function Controller(key) {
    _classCallCheck(this, Controller);

    if (Controller.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG);
    }

    this.multitonKey = key;
    this.commandMap = new Map();
    this.initializeController();
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


  _createClass(Controller, [{
    key: 'initializeController',


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
    value: function initializeController() {
      this.view = _View2.default.getInstance(this.multitonKey);
    }

    /**
     * If a SimpleCommand or MacroCommand has previously been registered to handle
     * the given Notification then it is executed.
     *
     * @param {puremvc.Notification} note
     * @return {void}
     */

  }, {
    key: 'executeCommand',
    value: function executeCommand(note) {
      var commandClassRef = this.commandMap.get(note.getName());
      if (!commandClassRef) {
        return;
      }
      // eslint-disable-next-line
      var commandInstance = new commandClassRef();
      commandInstance.initializeNotifier(this.multitonKey);
      commandInstance.execute(note);
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

  }, {
    key: 'registerCommand',
    value: function registerCommand(notificationName, commandClassRef) {
      if (!this.commandMap.has(notificationName)) {
        this.view.registerObserver(notificationName, new _Observer2.default(this.executeCommand, this));
      }
      this.commandMap.set(notificationName, commandClassRef);
    }

    /**
     * Check if a command is registered for a given Notification
     *
     * @param {string} notificationName
     * @return {boolean}
     *  whether a Command is currently registered for the given notificationName.
     */

  }, {
    key: 'hasCommand',
    value: function hasCommand(notificationName) {
      return this.commandMap.has(notificationName);
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

  }, {
    key: 'removeCommand',
    value: function removeCommand(notificationName) {
      if (this.hasCommand(notificationName)) {
        this.view.removeObserver(notificationName, this);
        this.commandMap.delete(notificationName);
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

  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (!key) {
        return null;
      }

      if (!this.instanceMap.has(key)) {
        this.instanceMap.set(key, new Controller(key));
      }

      return this.instanceMap.get(key);
    }
  }, {
    key: 'removeController',
    value: function removeController(key) {
      this.instanceMap.delete(key);
    }
  }]);

  return Controller;
}();

Controller.instanceMap = new Map();
exports.default = Controller;


var MULTITON_MSG = 'controller key for this Multiton key already constructed';
module.exports = exports['default'];

/***/ }),
/* 4 */
/*!**********************************************!*\
  !*** ./src/com/koreez/puremvc/core/Model.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Model = function () {
  function Model(key) {
    _classCallCheck(this, Model);

    if (Model.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG);
    }

    this.multitonKey = key;
    this.proxyMap = new Map();
    this.initializeModel();
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


  _createClass(Model, [{
    key: 'initializeModel',


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
    value: function initializeModel() {}

    /**
     * Register a Proxy with the Model
     * @param {puremvc.Proxy}
     */

  }, {
    key: 'registerProxy',
    value: function registerProxy(proxy) {
      proxy.initializeNotifier(this.multitonKey);
      this.proxyMap.set(proxy.getProxyName(), proxy);
      proxy.onRegister();
    }

    /**
     * Retrieve a Proxy from the Model
     *
     * @param {string} proxyName
     * @return {puremvc.Proxy}
     *  The Proxy instance previously registered with the provided proxyName
     */

  }, {
    key: 'retrieveProxy',
    value: function retrieveProxy(proxyName) {
      return this.proxyMap.get(proxyName);
    }

    /**
     * Check if a Proxy is registered
     * @param {string} proxyName
     * @return {boolean}
     *  whether a Proxy is currently registered with the given proxyName.
     */

  }, {
    key: 'hasProxy',
    value: function hasProxy(proxyName) {
      return this.proxyMap.has(proxyName);
    }

    /**
     * Remove a Proxy from the Model.
     *
     * @param {string} proxyName
     *  The name of the Proxy instance to remove
     * @return {puremvc.Proxy}
     *  The Proxy that was removed from the Model
     */

  }, {
    key: 'removeProxy',
    value: function removeProxy(proxyName) {
      if (this.proxyMap.has(proxyName)) {
        var proxy = this.proxyMap.get(proxyName);
        proxy.onRemove();
        this.proxyMap.delete(proxyName);
        return proxy;
      }
      return null;
    }

    /**
     * @static
     * Remove a Model instance.
     *
     * @param {string} key
     * @return {void}
     */

  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (!key) {
        return null;
      }

      if (!this.instanceMap.has(key)) {
        this.instanceMap.set(key, new Model(key));
      }

      return this.instanceMap.get(key);
    }
  }, {
    key: 'removeModel',
    value: function removeModel(key) {
      this.instanceMap.delete(key);
    }
  }]);

  return Model;
}();

Model.instanceMap = new Map();
exports.default = Model;


var MULTITON_MSG = 'Model instance for this Multiton key already constructed!';
module.exports = exports['default'];

/***/ }),
/* 5 */
/*!******************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/command/SimpleCommand.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = __webpack_require__(/*! ../observer/Notifier */ 0);

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 *
 * SimpleCommands encapsulate the business logic of your application. Your
 * subclass should override the #execute method where your business logic will
 * handle the
 * {@link puremvc.Notification Notification}
 *
 * Take a look at
 * {@link puremvc.Facade#registerCommand Facade's registerCommand}
 * or {@link puremvc.Controller#registerCommand Controllers registerCommand}
 * methods to see how to add commands to your application.
 *
 * @constructor
 */
var SimpleCommand = function (_Notifier) {
  _inherits(SimpleCommand, _Notifier);

  function SimpleCommand() {
    _classCallCheck(this, SimpleCommand);

    return _possibleConstructorReturn(this, (SimpleCommand.__proto__ || Object.getPrototypeOf(SimpleCommand)).apply(this, arguments));
  }

  _createClass(SimpleCommand, [{
    key: 'execute',

    /**
     * Fulfill the use-case initiated by the given Notification
     *
     * In the Command Pattern, an application use-case typically begins with some
     * user action, which results in a Notification is handled by the business logic
     * in the #execute method of a command.
     *
     * @param {puremvc.Notification} notification
     *  The notification to handle.
     * @return {void}
     */
    value: function execute(notification) {}
  }]);

  return SimpleCommand;
}(_Notifier3.default);

exports.default = SimpleCommand;
module.exports = exports['default'];

/***/ }),
/* 6 */
/*!**********************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/facade/Facade.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Controller = __webpack_require__(/*! ../../core/Controller */ 3);

var _Controller2 = _interopRequireDefault(_Controller);

var _Model = __webpack_require__(/*! ../../core/Model */ 4);

var _Model2 = _interopRequireDefault(_Model);

var _View = __webpack_require__(/*! ../../core/View */ 2);

var _View2 = _interopRequireDefault(_View);

var _Notification = __webpack_require__(/*! ../observer/Notification */ 7);

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Facade exposes the functionality of the Controller, Model and View
 * actors to client facing code.
 *
 * This Facade implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static Factory method,
 * passing the unique key for this instance to #getInstance
 *
 * @constructor
 * @param {string} key
 *  The multiton key to use to retrieve the Facade instance.
 * @throws {Error}
 *  If an attempt is made to instantiate Facade directly
 */
var Facade = function () {
  function Facade(key) {
    _classCallCheck(this, Facade);

    if (Facade.instanceMap.has(key)) {
      throw new Error(MULTITON_MSG);
    }

    this.initializeNotifier(key);
    this.initializeFacade();
  }

  /**
   * Facade Multiton Factory method.
   * Note that this method will return null if supplied a
   * null or undefined multiton key.
   *
   * @param {string} key
   *  The multiton key use to retrieve a particular Facade instance
   * @return {puremvc.Facade}
   */


  _createClass(Facade, [{
    key: 'initializeFacade',


    /**
     * Initialize the Multiton Facade instance.
     *
     * Called automatically by the constructor. Override in your subclass to any
     * subclass specific initializations. Be sure to call the 'super'
     * initializeFacade method, though
     *
     * @protected
     * @return {void}
     */
    value: function initializeFacade() {
      this.initializeModel();
      this.initializeController();
      this.initializeView();
    }

    /**
     * Initialize the {@link puremvc.Controller Controller}.
     *
     * Called by the #initializeFacade method.
     *
     * Override this method in your subclass of Facade
     * if one or both of the following are true:
      * - You wish to initialize a different Controller
     * - You have
     * {@link puremvc.SimpleCommand SimpleCommand}s
     * or {@link puremvc.MacroCommand MacroCommand}s
     * to register with the Controllerat startup.
     *
     * If you don't want to initialize a different Controller,
     * call the 'super' initializeControlle method at the beginning of your
     * method, then register commands.
     *
     * @protected
     * @return {void}
     */

  }, {
    key: 'initializeController',
    value: function initializeController() {
      if (this.controller) {
        return;
      }
      this.controller = _Controller2.default.getInstance(this.multitonKey);
    }

    /**
     * @protected
     * Initialize the {@link puremvc.Model Model};
     *
     * Called by the #initializeFacade method.
     * Override this method in your subclass of Facade if one of the following are
     * true:
     *
     * - You wish to initialize a different Model.
     *
     * - You have {@link puremvc.Proxy Proxy}s to
     *   register with the Model that do not retrieve a reference to the Facade at
     *   construction time.
     *
     * If you don't want to initialize a different Model
     * call 'super' #initializeModel at the beginning of your method, then register
     * Proxys.
     *
     * Note: This method is *rarely* overridden; in practice you are more
     * likely to use a command to create and registerProxys with the Model>,
     * since Proxys with mutable data will likely
     * need to send Notifications and thus will likely want to fetch a reference to
     * the Facade during their construction.
     *
     * @return {void}
     */

  }, {
    key: 'initializeModel',
    value: function initializeModel() {
      if (this.model) {
        return;
      }
      this.model = _Model2.default.getInstance(this.multitonKey);
    }

    /**
     * @protected
     *
     * Initialize the {@link puremvc.View View}.
     *
     * Called by the #initializeFacade method.
     *
     * Override this method in your subclass of Facade if one or both of the
     * following are true:
     *
     * - You wish to initialize a different View.
     * - You have Observers to register with the View
     *
     * If you don't want to initialize a different View
     * call 'super' #initializeView at the beginning of your
     * method, then register Mediator instances.
     *
     * Note: This method is *rarely* overridden; in practice you are more
     * likely to use a command to create and register Mediators
     * with the View, since Mediator instances will need to send
     * Notifications and thus will likely want to fetch a reference
     * to the Facade during their construction.
     * @return {void}
     */

  }, {
    key: 'initializeView',
    value: function initializeView() {
      if (this.view) {
        return;
      }
      this.view = _View2.default.getInstance(this.multitonKey);
    }

    /**
     * Register a command with the Controller by Notification name
     * @param {string} notificationName
     *  The name of the Notification to associate the command with
     * @param {Function} commandClassRef
     *  A reference ot the commands constructor.
     * @return {void}
     */

  }, {
    key: 'registerCommand',
    value: function registerCommand(notificationName, commandClassRef) {
      this.controller.registerCommand(notificationName, commandClassRef);
    }

    /**
     * Remove a previously registered command to Notification mapping from the
     * {@link puremvc.Controller#removeCommand Controller}
     * @param {string} notificationName
     *  The name of the the Notification to remove from the command mapping for.
     * @return {void}
     */

  }, {
    key: 'removeCommand',
    value: function removeCommand(notificationName) {
      this.controller.removeCommand(notificationName);
    }

    /**
     * Check if a command is registered for a given notification.
     *
     * @param {string} notificationName
     *  A Notification name
     * @return {boolean}
     *  Whether a comman is currently registered for the given notificationName
     */

  }, {
    key: 'hasCommand',
    value: function hasCommand(notificationName) {
      return this.controller.hasCommand(notificationName);
    }

    /**
     * Register a Proxy with the {@link puremvc.Model#registerProxy Model}
     * by name.
     *
     * @param {puremvc.Proxy} proxy
     *  The Proxy instance to be registered with the Model.
     * @return {void}
     */

  }, {
    key: 'registerProxy',
    value: function registerProxy(proxy) {
      this.model.registerProxy(proxy);
    }

    /**
     * Retrieve a Proxy from the Model
     *
     * @param {string} proxyName
     * @return {puremvc.Proxy}
     */

  }, {
    key: 'retrieveProxy',
    value: function retrieveProxy(proxyName) {
      return this.model.retrieveProxy(proxyName);
    }

    /**
     * Remove a Proxy from the Model by name
     * @param {string} proxyName
     *  The name of the Proxy
     * @return {puremvc.Proxy}
     *  The Proxy that was removed from the Model
     */

  }, {
    key: 'removeProxy',
    value: function removeProxy(proxyName) {
      if (this.model) {
        return this.model.removeProxy(proxyName);
      }
      return null;
    }

    /**
     * Check it a Proxy is registered.
     * @param {string} proxyName
     *  A Proxy name
     * @return {boolean}
     *  Whether a Proxy is currently registered with the given proxyName
     */

  }, {
    key: 'hasProxy',
    value: function hasProxy(proxyName) {
      return this.model.hasProxy(proxyName);
    }

    /**
     * Register a Mediator with with the View.
     *
     * @param {puremvc.Mediator} mediator
     *  A reference to the Mediator to register
     * @return {void}
     */

  }, {
    key: 'registerMediator',
    value: function registerMediator(mediator) {
      this.view.registerMediator(mediator);
    }

    /**
     * Retrieve a Mediator from the View by name
     *
     * @param {string} mediatorName
     *  The Mediators name
     * @return {puremvc.Mediator}
     *  The retrieved Mediator
     */

  }, {
    key: 'retrieveMediator',
    value: function retrieveMediator(mediatorName) {
      return this.view.retrieveMediator(mediatorName);
    }

    /**
     * Remove a Mediator from the View.
     *
     * @param {string} mediatorName
     *  The name of the Mediator to remove.
     * @return {puremvc.Mediator}
     *  The removed Mediator
     */

  }, {
    key: 'removeMediator',
    value: function removeMediator(mediatorName) {
      return this.view.removeMediator(mediatorName);
    }

    /**
     * Check if a Mediator is registered or not.
     *
     * @param {string} mediatorName
     *  A Mediator name
     * @return {boolean}
     *  Whether a Mediator is registered with the given mediatorName
     */

  }, {
    key: 'hasMediator',
    value: function hasMediator(mediatorName) {
      return this.view.hasMediator(mediatorName);
    }

    /**
     * Create and send a
     * {@link puremvc.Notification Notification}
     *
     * Keeps us from having to construct new Notification instances in our
     * implementation
     *
     * @param {string} notificationName
     *  The name of the Notification to send
     * @param {Object} [body]
     *  The body of the notification
     * @param {string} [type]
     *  The type of the notification
     * @return {void}
     */

  }, {
    key: 'sendNotification',
    value: function sendNotification(notificationName, body, type) {
      this.notifyObservers(new _Notification2.default(notificationName, body, type));
    }

    /**
     * Notify {@link puremvc.Observer Observer}s
     *
     * This method is left public mostly for backward compatibility, and to allow
     * you to send custom notification classes using the facade.
     *
     * Usually you should just call sendNotification and pass the parameters, never
     * having to construct the notification yourself.
     *
     * @param {puremvc.Notification} notification
     *  The Notification to send
     * @return {void}
     */

  }, {
    key: 'notifyObservers',
    value: function notifyObservers(notification) {
      this.view.notifyObservers(notification);
    }

    /**
     * Initialize the Facades Notifier capabilities by setting the Multiton key for
     * this facade instance.
     *
     * Not called directly, but instead from the constructor when #getInstance is
     * invoked. It is necessary to be public in order to implement Notifier
     *
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'initializeNotifier',
    value: function initializeNotifier(key) {
      this.multitonKey = key;
    }

    /**
     * Check if a *Core* is registered or not
     *
     * @static
     * @param {string} key
     *  The multiton key for the *Core* in question
     * @return {boolean}
     *  Whether a *Core* is registered with the given key
     */

  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (!key) {
        return null;
      }

      if (!Facade.instanceMap.has(key)) {
        Facade.instanceMap.set(key, new Facade(key));
      }

      return Facade.instanceMap.get(key);
    }
  }, {
    key: 'hasCore',
    value: function hasCore(key) {
      return this.instanceMap.has(key);
    }

    /**
     * Remove a *Core*
     *
     * Remove the Model, View, Controller and Facade for a given key.
     *
     * @static
     * @param {string} key
     * @return {void}
     */

  }, {
    key: 'removeCore',
    value: function removeCore(key) {
      if (!this.instanceMap.has(key)) {
        return;
      }
      _Model2.default.removeModel(key);
      _View2.default.removeView(key);
      _Controller2.default.removeController(key);
      delete this.instanceMap[key];
    }
  }]);

  return Facade;
}();

Facade.instanceMap = new Map();
exports.default = Facade;


var MULTITON_MSG = 'Facade instance for this Multiton key already constructed!';
module.exports = exports['default'];

/***/ }),
/* 7 */
/*!******************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/observer/Notification.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Notification = function () {
  function Notification(name, body, type) {
    _classCallCheck(this, Notification);

    this.name = name;
    this.body = body;
    this.type = type;
  }

  /**
   * Get the name of the Notification instance
   *
   * @return {string}
   *  The name of the Notification instance
   */


  _createClass(Notification, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }

    /**
     * Set this Notifications body.
     * @param {Object} body
     * @return {void}
     */

  }, {
    key: 'setBody',
    value: function setBody(body) {
      this.body = body;
    }

    /**
     * Get the Notification body.
     *
     * @return {Object}
     */

  }, {
    key: 'getBody',
    value: function getBody() {
      return this.body;
    }

    /**
     * Set the type of the Notification instance.
     *
     * @param {Object} type
     * @return {void}
     */

  }, {
    key: 'setType',
    value: function setType(type) {
      this.type = type;
    }

    /**
     * Get the type of the Notification instance.
     *
     * @return {Object}
     */

  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }

    /**
     * Get a string representation of the Notification instance
     *
     * @return {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      var msg = 'Notification Name: ' + this.getName();
      msg += '\nBody:' + (this.body ? 'null' : this.body.toString());
      msg += '\nType:' + (this.type ? 'null' : this.type);
      return msg;
    }
  }]);

  return Notification;
}();

exports.default = Notification;
module.exports = exports['default'];

/***/ }),
/* 8 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Proxy = exports.Observer = exports.Notifier = exports.Notification = exports.Mediator = exports.Facade = exports.SimpleCommand = exports.MacroCommand = exports.View = exports.Model = exports.Controller = undefined;

var _Controller = __webpack_require__(/*! ./com/koreez/puremvc/core/Controller */ 3);

var _Controller2 = _interopRequireDefault(_Controller);

var _Model = __webpack_require__(/*! ./com/koreez/puremvc/core/Model */ 4);

var _Model2 = _interopRequireDefault(_Model);

var _View = __webpack_require__(/*! ./com/koreez/puremvc/core/View */ 2);

var _View2 = _interopRequireDefault(_View);

var _MacroCommand = __webpack_require__(/*! ./com/koreez/puremvc/patterns/command/MacroCommand */ 9);

var _MacroCommand2 = _interopRequireDefault(_MacroCommand);

var _SimpleCommand = __webpack_require__(/*! ./com/koreez/puremvc/patterns/command/SimpleCommand */ 5);

var _SimpleCommand2 = _interopRequireDefault(_SimpleCommand);

var _Facade = __webpack_require__(/*! ./com/koreez/puremvc/patterns/facade/Facade */ 6);

var _Facade2 = _interopRequireDefault(_Facade);

var _Mediator = __webpack_require__(/*! ./com/koreez/puremvc/patterns/mediator/Mediator */ 10);

var _Mediator2 = _interopRequireDefault(_Mediator);

var _Notification = __webpack_require__(/*! ./com/koreez/puremvc/patterns/observer/Notification */ 7);

var _Notification2 = _interopRequireDefault(_Notification);

var _Notifier = __webpack_require__(/*! ./com/koreez/puremvc/patterns/observer/Notifier */ 0);

var _Notifier2 = _interopRequireDefault(_Notifier);

var _Observer = __webpack_require__(/*! ./com/koreez/puremvc/patterns/observer/Observer */ 1);

var _Observer2 = _interopRequireDefault(_Observer);

var _Proxy = __webpack_require__(/*! ./com/koreez/puremvc/patterns/proxy/Proxy */ 11);

var _Proxy2 = _interopRequireDefault(_Proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Controller = _Controller2.default;
exports.Model = _Model2.default;
exports.View = _View2.default;
exports.MacroCommand = _MacroCommand2.default;
exports.SimpleCommand = _SimpleCommand2.default;
exports.Facade = _Facade2.default;
exports.Mediator = _Mediator2.default;
exports.Notification = _Notification2.default;
exports.Notifier = _Notifier2.default;
exports.Observer = _Observer2.default;
exports.Proxy = _Proxy2.default;


var PureMVC = {};
PureMVC.Controller = _Controller2.default;
PureMVC.Model = _Model2.default;
PureMVC.View = _View2.default;
PureMVC.MacroCommand = _MacroCommand2.default;
PureMVC.SimpleCommand = _SimpleCommand2.default;
PureMVC.Facade = _Facade2.default;
PureMVC.Mediator = _Mediator2.default;
PureMVC.Notification = _Notification2.default;
PureMVC.Notifier = _Notifier2.default;
PureMVC.Observer = _Observer2.default;
PureMVC.Proxy = _Proxy2.default;

exports.default = PureMVC;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/command/MacroCommand.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SimpleCommand2 = __webpack_require__(/*! ./SimpleCommand */ 5);

var _SimpleCommand3 = _interopRequireDefault(_SimpleCommand2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A base command implementation that executes other commands, such as
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or {@link puremvc.MacroCommand MacroCommand}
 * subclasses.
 *
 * A MacroCommand maintains an list of
 * command constructor references called *SubCommands*.
 *
 * When #execute is called, the MacroCommand
 * instantiates and calls #execute on each of its *SubCommands* in turn.
 * Each *SubCommand* will be passed a reference to the original
 * {@link puremvc.Notification Notification}
 * that was passed to the MacroCommands #execute method
 *
 * Unlike {@link puremvc.SimpleCommand SimpleCommand},
 * your subclass should not override #execute but instead, should
 * override the #initializeMacroCommand method, calling #addSubCommand once for
 * each *SubCommand* to be executed.
 *
 * If your subclass does define a constructor, be sure to call "super"
 *
 * @constructor
 */
var MacroCommand = function (_SimpleCommand) {
  _inherits(MacroCommand, _SimpleCommand);

  function MacroCommand() {
    _classCallCheck(this, MacroCommand);

    var _this = _possibleConstructorReturn(this, (MacroCommand.__proto__ || Object.getPrototypeOf(MacroCommand)).call(this));

    _this.subCommands = [];
    _this.initializeMacroCommand();
    return _this;
  }

  /**
   * @protected
   * Initialize the MacroCommand.
   *
   * In your subclass, override this method to
   * initialize the MacroCommand's *SubCommand*
   * list with command class references
   *
   * Note that *SubCommand*s may be any command implementor,
   * MacroCommands or SimpleCommands are both acceptable.
   * @return {void}
   */


  _createClass(MacroCommand, [{
    key: 'initializeMacroCommand',
    value: function initializeMacroCommand() {}

    /**
     * @protected
     * Add a *SubCommand*
     *
     * The *SubCommand*s will be called in First In / First Out (FIFO) order
     * @param {Function} commandClassRef
     *  A reference to a subclassed SimpleCommand or MacroCommand constructor
     */

  }, {
    key: 'addSubCommand',
    value: function addSubCommand(subCommand) {
      this.subCommands.push(subCommand);
    }

    /**
     * Execute this MacroCommands *SubCommands*
     *
     * The *SubCommand*s will be called in First In / First Out (FIFO) order
     * @param {puremvc.Notification} note
     *  The Notification object to be passed to each *SubCommand*
     */

  }, {
    key: 'execute',
    value: function execute(note) {
      while (this.subCommands.length > 0) {
        var ref = this.subCommands.shift();
        // eslint-disable-next-line new-cap
        var cmd = new ref();
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
      }
    }
  }]);

  return MacroCommand;
}(_SimpleCommand3.default);

exports.default = MacroCommand;
module.exports = exports['default'];

/***/ }),
/* 10 */
/*!**************************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/mediator/Mediator.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = __webpack_require__(/*! ../observer/Notifier */ 0);

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A base Mediator implementation.
 *
 * In PureMVC, Mediator classes are used to mediate communication between a view
 * component and the rest of the application.
 *
 * A Mediator should listen to its view components for events, and handle them
 * by sending notifications (to be handled by other Mediators,
 * {@link puremvc.SimpleCommand SimpleCommands}
 * or
 * {@link puremvc.MacroCommand MacroCommands})
 * or passing data from the view component directly to a
 * {@link puremvc.Proxy Proxy}, such as submitting
 * the contents of a form to a service.
 *
 * Mediators should not perform business logic, maintain state or other
 * information for its view component, or break the encapsulation of the view
 * component by manipulating the view component's children. It should only call
 * methods or set properties on the view component.
 *
 * The view component should encapsulate its own behavior and implementation by
 * exposing methods and properties that the Mediator can call without having to
 * know about the view component's children.
 *
 * @constructor
 * @param {string} [mediatorName]
 *  The Mediators name. The Mediators static #NAME value is used by default
 * @param {Object} [viewComponent]
 *  The Mediators {@link #setViewComponent viewComponent}.
 */
var Mediator = function (_Notifier) {
  _inherits(Mediator, _Notifier);

  function Mediator(mediatorName, viewComponent) {
    _classCallCheck(this, Mediator);

    var _this = _possibleConstructorReturn(this, (Mediator.__proto__ || Object.getPrototypeOf(Mediator)).call(this));

    _this.mediatorName = mediatorName || NAME;
    _this.viewComponent = viewComponent;
    return _this;
  }

  /**
   * Get the name of the Mediator
   *
   * @return {string}
   *  The Mediator name
   */


  _createClass(Mediator, [{
    key: 'getMediatorName',
    value: function getMediatorName() {
      return this.mediatorName;
    }

    /**
     * Set the Mediators view component. This could
     * be a HTMLElement, a bespoke UiComponent wrapper
     * class, a MooTools Element, a jQuery result or a
     * css selector, depending on which DOM abstraction
     * library you are using.
     *
     *
     * @param {Object} the view component
     * @return {void}
     */

  }, {
    key: 'setViewComponent',
    value: function setViewComponent(viewComponent) {
      this.viewComponent = viewComponent;
    }

    /**
     * Get the Mediators view component.
     *
     * Additionally, an optional explicit getter can be
     * be defined in the subclass that defines the
     * view components, providing a more semantic interface
     * to the Mediator.
     *
     * This is different from the AS3 implementation in
     * the sense that no casting is required from the
     * object supplied as the view component.
     *
     * @return {Object}
     *  The view component
     */

  }, {
    key: 'getViewComponent',
    value: function getViewComponent() {
      return this.viewComponent;
    }

    /**
     * List the Notification names this Mediator is interested
     * in being notified of.
     *
     * @return {Array}
     *  The list of Notification names.
     */

  }, {
    key: 'listNotificationInterests',
    value: function listNotificationInterests() {
      return [];
    }

    /**
     * Handle Notifications.
     *
     * Typically this will be handled in a switch statement
     * with one 'case' entry per Notification the Mediator
     * is interested in
     *
     * @param {puremvc.Notification} notification
     * @return {void}
     */

  }, {
    key: 'handleNotification',
    value: function handleNotification(notification) {}

    /**
     * Called by the View when the Mediator is registered
     * @return {void}
     */

  }, {
    key: 'onRegister',
    value: function onRegister() {}

    /**
     * Called by the View when the Mediator is removed
     */

  }, {
    key: 'onRemove',
    value: function onRemove() {}
  }]);

  return Mediator;
}(_Notifier3.default);

exports.default = Mediator;


var NAME = 'Mediator';
module.exports = exports['default'];

/***/ }),
/* 11 */
/*!********************************************************!*\
  !*** ./src/com/koreez/puremvc/patterns/proxy/Proxy.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = __webpack_require__(/*! ../observer/Notifier */ 0);

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sargis on 7/4/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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
var Proxy = function (_Notifier) {
  _inherits(Proxy, _Notifier);

  function Proxy(proxyName, data) {
    _classCallCheck(this, Proxy);

    var _this = _possibleConstructorReturn(this, (Proxy.__proto__ || Object.getPrototypeOf(Proxy)).call(this));

    _this.proxyName = proxyName || NAME;
    if (data) {
      _this.setData(data);
    }
    return _this;
  }

  /**
   * Get the Proxy's name.
   *
   * @return {string}
   */


  _createClass(Proxy, [{
    key: 'getProxyName',
    value: function getProxyName() {
      return this.proxyName;
    }

    /**
     * Set the Proxy's data object
     *
     * @param {Object} data
     * @return {void}
     */

  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data;
    }

    /**
     * Get the Proxy's data object
     *
     * @return {Object}
     */

  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }

    /**
     * Called by the {@link puremvc.Model Model} when
     * the Proxy is registered.
     *
     * @return {void}
     */

  }, {
    key: 'onRegister',
    value: function onRegister() {}

    /**
     * Called by the {@link puremvc.Model Model} when
     * the Proxy is removed.
     *
     * @return {void}
     */

  }, {
    key: 'onRemove',
    value: function onRemove() {}
  }]);

  return Proxy;
}(_Notifier3.default);

exports.default = Proxy;


var NAME = 'Proxy';
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=library.js.map