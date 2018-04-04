/**
 * Created by sargis on 7/4/17.
 */

import Controller from '../../core/Controller';
import Model from '../../core/Model';
import View from '../../core/View';
import SimpleCommand from '../command/SimpleCommand';
import Mediator from '../mediator/Mediator';
import Proxy from '../proxy/Proxy';

export default class Facade {
  public static getInstance(key: string): Facade {
    if (!key) {
      return null;
    }

    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] = new Facade(key);
    }

    return Facade.instanceMap[key];
  }

  public static hasCore(key: string): boolean {
    return this.instanceMap[key] !== undefined;
  }

  public static removeCore(key: string): void {
    if (!this.instanceMap[key]) {
      return;
    }
    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete this.instanceMap[key];
  }
  protected static instanceMap: { [key: string]: Facade } = {};

  private model: Model;
  private view: View;
  private controller: Controller;
  private multitonKey: string;

  constructor(key: string) {
    if (Facade.instanceMap[key]) {
      throw new Error(MULTITON_MSG);
    }
    this.initializeNotifier(key);
    this.initializeFacade();
  }

  public initializeFacade(): void {
    this.initializeModel();
    this.initializeController();
    this.initializeView();
  }

  public registerCommand<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): void {
    this.controller.registerCommand<T>(notificationName, commandClassRef);
  }

  public removeCommand(notificationName: string): void {
    this.controller.removeCommand(notificationName);
  }

  public hasCommand(notificationName: string): boolean {
    return this.controller.hasCommand(notificationName);
  }

  public registerProxy<T extends Proxy>(proxy: T): void {
    this.model.registerProxy<T>(proxy);
  }

  public retrieveProxy<T extends Proxy>(proxyName: string): T {
    return this.model.retrieveProxy(proxyName);
  }

  public removeProxy<T extends Proxy>(proxyName: string): T {
    if (this.model) {
      return this.model.removeProxy(proxyName);
    }
    return null;
  }

  public hasProxy(proxyName: string): boolean {
    return this.model.hasProxy(proxyName);
  }

  public registerMediator<V, T extends Mediator<V>>(mediator: T): void {
    this.view.registerMediator(mediator);
  }

  public retrieveMediator<V, T extends Mediator<V>>(mediatorName: string): T {
    return this.view.retrieveMediator(mediatorName);
  }

  public removeMediator<V, T extends Mediator<V>>(mediatorName: string): T {
    return this.view.removeMediator(mediatorName);
  }

  public hasMediator(mediatorName: string): boolean {
    return this.view.hasMediator(mediatorName);
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    this.notifyObservers(notificationName, ...args);
  }

  public notifyObservers(notificationName: string, ...args: any[]): void {
    this.view.notifyObservers(notificationName, ...args);
  }

  public initializeNotifier(key: string): void {
    this.multitonKey = key;
  }
  protected initializeController(): void {
    if (this.controller) {
      return;
    }
    this.controller = Controller.getInstance(this.multitonKey);
  }

  protected initializeModel(): void {
    if (this.model) {
      return;
    }
    this.model = Model.getInstance(this.multitonKey);
  }

  protected initializeView(): void {
    if (this.view) {
      return;
    }
    this.view = View.getInstance(this.multitonKey);
  }
}

const MULTITON_MSG: string =
  'Facade instance for this Multiton key already constructed!';
