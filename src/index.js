import Controller from './com/koreez/puremvc/core/Controller'
import Model from './com/koreez/puremvc/core/Model'
import View from './com/koreez/puremvc/core/View'
import AsyncMacroCommand from './com/koreez/puremvc/patterns/command/AsyncMacroCommand'
import SyncMacroCommand from './com/koreez/puremvc/patterns/command/SyncMacroCommand'
import SimpleCommand from './com/koreez/puremvc/patterns/command/SimpleCommand'
import Facade from './com/koreez/puremvc/patterns/facade/Facade'
import Mediator from './com/koreez/puremvc/patterns/mediator/Mediator'
import Notifier from './com/koreez/puremvc/patterns/observer/Notifier'
import Proxy from './com/koreez/puremvc/patterns/proxy/Proxy'

export {
  Controller,
  Model,
  View,
  AsyncMacroCommand,
  SyncMacroCommand,
  SimpleCommand,
  Facade,
  Mediator,
  Notifier,
  Proxy,
}

const PureMVC = {}
PureMVC.Controller = Controller
PureMVC.Model = Model
PureMVC.View = View
PureMVC.AsyncMacroCommand = AsyncMacroCommand
PureMVC.SyncMacroCommand = SyncMacroCommand
PureMVC.SimpleCommand = SimpleCommand
PureMVC.Facade = Facade
PureMVC.Mediator = Mediator
PureMVC.Notifier = Notifier
PureMVC.Proxy = Proxy

export default PureMVC
