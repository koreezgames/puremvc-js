import SimpleCommand from '../patterns/command/SimpleCommand';
import View from './View';

export default class Controller {
  public static removeController(key: string): void {
    delete this.instanceMap[key];
  }

  public static getInstance(key: string): Controller {
    if (!key) {
      return null;
    }

    if (!this.instanceMap[key]) {
      this.instanceMap[key] = new Controller(key);
    }

    return this.instanceMap[key];
  }

  private static instanceMap: { [key: string]: Controller } = {};

  private commandMap: { [key: string]: new () => SimpleCommand } = {};
  private multitonKey: string;
  private view: View;

  constructor(key: string) {
    if (Controller.instanceMap[key]) {
      throw new Error(MULTITON_MSG);
    }

    this.multitonKey = key;
    this.initializeController();
  }

  public registerCommand<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): void {
    if (!this.commandMap[notificationName]) {
      this.view.registerObserver(notificationName, this.executeCommand, this);
    }
    this.commandMap[notificationName] = commandClassRef;
  }

  public hasCommand(notificationName: string): boolean {
    return this.commandMap[notificationName] !== undefined;
  }

  public removeCommand(notificationName: string): void {
    if (this.hasCommand(notificationName)) {
      this.view.removeObserver(notificationName, this.executeCommand, this);
      delete this.commandMap[notificationName];
    }
  }

  protected initializeController(): void {
    this.view = View.getInstance(this.multitonKey);
  }

  protected executeCommand(notificationName: string, ...args: any[]): void {
    const commandClassRef: new () => SimpleCommand = this.commandMap[
      notificationName
    ];
    if (!commandClassRef) {
      return;
    }
    const commandInstance: SimpleCommand = new commandClassRef();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(notificationName, ...args);
  }
}

const MULTITON_MSG: string =
  'controller key for this Multiton key already constructed';
