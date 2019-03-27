import { Notifier } from "./Notifier";
import { PureMVC } from "./PureMVC";

const NAME: string = "Mediator";

export abstract class Mediator<T> extends Notifier {
    private static readonly _consoleArgs: string[] = [
        "",
        `background: ${"#2A3351"}`,
        `background: ${"#364D98"}`,
        `color: ${"#F4F6FE"}; background: ${"#3656C1"};`,
        `background: ${"#364D98"}`,
        `background: ${"#2A3351"}`
    ];

    protected viewComponent: T;
    private mediatorName: string;
    private sleeping: boolean;
    private subscribedNotifications: string[];
    private notificationSubscriptionChange: (mediator: Mediator<T>, oldNotifications: string[]) => void;
    private logger: (consoleArgs: string[], name: string, action: string) => void;

    constructor(mediatorName: string, viewComponent?: T) {
        super();
        this.logger = PureMVC.debug ? PureMVC.logMediator : PureMVC.logNone;
        this.mediatorName = mediatorName || NAME;
        this.viewComponent = viewComponent;
        this.sleeping = true;
        this.subscribedNotifications = [];
        this.notificationSubscriptionChange = null;
    }

    public get notifications(): string[] {
        return this.subscribedNotifications;
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

    public abstract handleNotification(notificationName: string): void;

    public onRegister(notificationSubscriptionChange: <V>(mediator: Mediator<V>, oldNotifications: string[]) => void): void {
        this.notificationSubscriptionChange = notificationSubscriptionChange;
        this.logger(Mediator._consoleArgs, this.constructor.name, "register");
    }

    public onRemove(): void {
        this.notificationSubscriptionChange = null;
        this.logger(Mediator._consoleArgs, this.constructor.name, "remove");
    }

    public onSleep(): void {
        this.sleeping = true;
        this.logger(Mediator._consoleArgs, this.constructor.name, "sleep");
    }

    public onAwake(): void {
        this.sleeping = false;
        this.logger(Mediator._consoleArgs, this.constructor.name, "awake");
    }

    public get isSleeping(): boolean {
        return this.sleeping;
    }

    protected subscribeNotification(notificationName: string | string[]): void {
        this.changeSubscription(notificationName, this.addSubscription);
    }

    protected unsubscribeNotification(notificationName: string | string[]): void {
        this.changeSubscription(notificationName, this.removeSubscription);
    }

    private changeSubscription(notificationName: string | string[], action: (notification: string) => boolean): void {
        const oldNotifications: string[] = [...this.notifications];
        let changed: boolean = false;
        if (notificationName instanceof Array) {
            notificationName.forEach((notification: string) => {
                changed = action.call(this, notification) || changed;
            });
        } else {
            changed = action.call(this, notificationName);
        }
        if (changed && this.notificationSubscriptionChange) {
            this.notificationSubscriptionChange(this, oldNotifications);
        }
    }

    private addSubscription(notification: string): boolean {
        if (this.notifications.indexOf(notification) === -1) {
            this.notifications.push(notification);
            return true;
        }
        return false;
    }

    private removeSubscription(notification: string): boolean {
        const index: number = this.notifications.indexOf(notification);
        if (index !== -1) {
            this.notifications.splice(index, 1);
            return true;
        }
        return false;
    }
}
