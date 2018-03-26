import Controller from './com/koreez/puremvc/core/Controller';
import Model from './com/koreez/puremvc/core/Model';
import View from './com/koreez/puremvc/core/View';
import AsyncMacroCommand from './com/koreez/puremvc/patterns/command/AsyncMacroCommand';
import SimpleCommand from './com/koreez/puremvc/patterns/command/SimpleCommand';
import SyncMacroCommand from './com/koreez/puremvc/patterns/command/SyncMacroCommand';
import Facade from './com/koreez/puremvc/patterns/facade/Facade';
import Mediator from './com/koreez/puremvc/patterns/mediator/Mediator';
import Notifier from './com/koreez/puremvc/patterns/observer/Notifier';
import Proxy from './com/koreez/puremvc/patterns/proxy/Proxy';

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
};

const PureMVC: any = {
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
};

export default PureMVC;