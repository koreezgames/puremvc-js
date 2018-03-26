/**
 * Created by sargis on 7/4/17.
 */
import Facade from '../facade/Facade';

export default class Notifier {
  protected facade: Facade;
  protected multitonKey: string;

  public initializeNotifier(key: string): void {
    this.multitonKey = key;
    this.facade = this.getFacade();
  }

  protected sendNotification(notificationName: string, ...args: any[]): void {
    if (this.facade) {
      this.facade.sendNotification(notificationName, ...args);
    }
  }

  private getFacade(): Facade {
    if (this.multitonKey === null) {
      throw new Error(MULTITON_MSG);
    }

    return Facade.getInstance(this.multitonKey);
  }
}

const MULTITON_MSG: string =
  'multitonKey for this Notifier not yet initialized!';
