import Notifier from '../observer/Notifier';
export default abstract class Mediator extends Notifier {
    protected viewComponent: string;
    private mediatorName;
    constructor(mediatorName: string, viewComponent: any);
    getMediatorName(): string;
    setViewComponent(viewComponent: any): void;
    getViewComponent(): any;
    abstract listNotificationInterests(): string[];
    abstract handleNotification(notificationName: string): void;
    onRegister(): void;
    onRemove(): void;
}
