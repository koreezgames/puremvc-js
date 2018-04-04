import Notifier from '../observer/Notifier';
export default abstract class Mediator<T> extends Notifier {
    protected viewComponent: T;
    private mediatorName;
    constructor(mediatorName: string, viewComponent: T);
    getMediatorName(): string;
    setViewComponent(viewComponent: T): void;
    getViewComponent(): T;
    abstract listNotificationInterests(): string[];
    abstract handleNotification(notificationName: string): void;
    onRegister(): void;
    onRemove(): void;
}
