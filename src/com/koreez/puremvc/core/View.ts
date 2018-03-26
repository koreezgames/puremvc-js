import EventEmitter from 'eventemitter3';
import Mediator from '../patterns/mediator/Mediator';

export default class View {
  public static getInstance(key: string): View {
    if (!key) {
      return null;
    }

    if (!this.instanceMap[key]) {
      this.instanceMap[key] = new View(key);
    }

    return this.instanceMap[key];
  }

  public static removeView(key: string): void {
    delete this.instanceMap[key];
  }

  private static instanceMap: { [key: string]: View } = {};

  private multitonKey: string;
  private mediatorMap: { [key: string]: Mediator } = {};
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor(key: string) {
    if (View.instanceMap[key]) {
      throw new Error(MULTITON_MSG);
    }
    this.multitonKey = key;
    this.initializeView();
  }

  public removeObserver(
    notificationName: string,
    observerMethod: (notificationName: string, ...args: any[]) => void,
    context: any,
  ): void {
    this.eventEmitter.removeListener(notificationName, observerMethod, context);
  }

  public registerObserver(
    notificationName: string,
    observerMethod: (notificationName: string, ...args: any[]) => void,
    context: any,
  ): void {
    this.eventEmitter.on(notificationName, observerMethod, context);
  }

  public notifyObservers(notificationName: string, ...args: any[]): void {
    this.eventEmitter.emit(notificationName, notificationName, ...args);
  }

  public registerMediator(mediator: Mediator): void {
    if (this.mediatorMap[mediator.getMediatorName()]) {
      return;
    }

    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()] = mediator;

    // get notification interests if any
    const interests: string[] = mediator.listNotificationInterests();

    // register mediator as an observer for each notification
    if (interests.length > 0) {
      for (const interest of interests) {
        this.registerObserver(interest, mediator.handleNotification, mediator);
      }
    }

    mediator.onRegister();
  }

  public retrieveMediator<T extends Mediator>(mediatorName: string): T {
    return this.mediatorMap[mediatorName] as T;
  }

  public removeMediator<T extends Mediator>(mediatorName: string): T {
    const mediator: Mediator = this.mediatorMap[mediatorName];
    if (mediator) {
      // for every notification the mediator is interested in...
      const interests: string[] = mediator.listNotificationInterests();
      if (interests.length > 0) {
        for (const interest of interests) {
          // interest
          this.removeObserver(interest, mediator.handleNotification, mediator);
        }
      }
      // remove the mediator from the map
      delete this.mediatorMap[mediatorName];

      // alert the mediator that it has been removed
      mediator.onRemove();
    }

    return mediator as T;
  }

  public hasMediator(mediatorName: string): boolean {
    return this.mediatorMap[mediatorName] !== undefined;
  }

  protected initializeView(): void {}
}

const MULTITON_MSG: string =
  'View instance for this Multiton key already constructed!';
