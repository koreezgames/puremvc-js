import Notifier from '../observer/Notifier';

export default abstract class Mediator extends Notifier {
  protected viewComponent: string;
  private mediatorName: string;

  constructor(mediatorName: string, viewComponent: any) {
    super();
    this.mediatorName = mediatorName || NAME;
    this.viewComponent = viewComponent;
  }

  public getMediatorName(): string {
    return this.mediatorName;
  }

  public setViewComponent(viewComponent: any): void {
    this.viewComponent = viewComponent;
  }

  public getViewComponent(): any {
    return this.viewComponent;
  }

  public abstract listNotificationInterests(): string[];

  public abstract handleNotification(notificationName: string): void;

  public onRegister(): void {}

  public onRemove(): void {}
}

const NAME: string = 'Mediator';
