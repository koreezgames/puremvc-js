import Controller from './com/koreez/puremvc/core/Controller'
import Model from './com/koreez/puremvc/core/Model'
import View from './com/koreez/puremvc/core/View'
import MacroCommand from './com/koreez/puremvc/patterns/command/MacroCommand'
import SimpleCommand from './com/koreez/puremvc/patterns/command/SimpleCommand'
import Facade from './com/koreez/puremvc/patterns/facade/Facade'
import Mediator from './com/koreez/puremvc/patterns/mediator/Mediator'
import Notification from './com/koreez/puremvc/patterns/observer/Notification'
import Notifier from './com/koreez/puremvc/patterns/observer/Notifier'
import Observer from './com/koreez/puremvc/patterns/observer/Observer'
import Proxy from './com/koreez/puremvc/patterns/proxy/Proxy'

export {
  Controller,
  Model,
  View,
  MacroCommand,
  SimpleCommand,
  Facade,
  Mediator,
  Notification,
  Notifier,
  Observer,
  Proxy,
}

const PureMVC = {}
PureMVC.Controller = Controller
PureMVC.Model = Model
PureMVC.View = View
PureMVC.MacroCommand = MacroCommand
PureMVC.SimpleCommand = SimpleCommand
PureMVC.Facade = Facade
PureMVC.Mediator = Mediator
PureMVC.Notification = Notification
PureMVC.Notifier = Notifier
PureMVC.Observer = Observer
PureMVC.Proxy = Proxy

export default PureMVC
