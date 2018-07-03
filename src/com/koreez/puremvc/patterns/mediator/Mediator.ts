import Notifier from '../observer/Notifier';

export default abstract class Mediator<T> extends Notifier {
  protected viewComponent: T;
  private mediatorName: string;
  private sleeping: boolean;

  constructor(mediatorName: string, viewComponent: T) {
    super();
    this.mediatorName = mediatorName || NAME;
    this.viewComponent = viewComponent;
    this.sleeping = true;
  }

  public getMediatorName(): string {
    return this.mediatorName;
  }

  public setViewComponent(viewComponent: T): void {
    this.viewComponent = viewComponent;
  }

  public getViewComponent(): T {
    return this.viewComponent;
  }

  public abstract listNotificationInterests(): string[];

  public abstract handleNotification(notificationName: string): void;

  public onRegister(): void {}

  public onRemove(): void {}

  public onSleep(): void {
    this.sleeping = true;
  }

  public onAwake(): void {
    this.sleeping = false;
  }

  public get isSleeping(): boolean {
    return this.sleeping;
  }
}

const NAME: string = 'Mediator';
