import * as EventEmitter from "eventemitter3";
import Mediator from "../patterns/mediator/Mediator";

const MULTITON_MSG: string = "View instance for this Multiton key already constructed!";

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
    private mediatorMap: { [key: string]: Mediator<any> } = {};
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
        context: any
    ): void {
        this.eventEmitter.removeListener(notificationName, observerMethod, context);
    }

    public registerObserver(
        notificationName: string,
        observerMethod: (notificationName: string, ...args: any[]) => void,
        context: any
    ): void {
        this.eventEmitter.on(notificationName, observerMethod, context);
    }

    public notifyObservers(notificationName: string, ...args: any[]): void {
        this.eventEmitter.emit(notificationName, notificationName, ...args);
    }

    public registerMediator<V>(mediator: Mediator<V>): void {
        if (this.mediatorMap[mediator.getMediatorName()]) {
            return;
        }

        mediator.initializeNotifier(this.multitonKey);
        // register the mediator for retrieval by name
        this.mediatorMap[mediator.getMediatorName()] = mediator;

        this.registerObservers(mediator);

        mediator.onRegister(this.onMediatorNotificationSubscriptionChange.bind(this));
        mediator.onAwake();
    }

    public awakeMediator<V, T extends Mediator<V>>(mediatorName: string): T {
        const mediator: Mediator<V> = this.mediatorMap[mediatorName];
        if (mediator) {
            if (!mediator.isSleeping) {
                return mediator as T;
            }
            this.registerObservers(mediator);

            // alert the mediator that it has been awaken
            mediator.onAwake();
        }

        return mediator as T;
    }

    public retrieveMediator<V, T extends Mediator<V>>(mediatorName: string): T {
        return this.mediatorMap[mediatorName] as T;
    }

    public removeMediator<V, T extends Mediator<V>>(mediatorName: string): T {
        const mediator: Mediator<V> = this.mediatorMap[mediatorName];
        if (mediator) {
            this.removeObservers(mediator);

            // remove the mediator from the map
            delete this.mediatorMap[mediatorName];

            mediator.onSleep();
            // alert the mediator that it has been removed
            mediator.onRemove();
        }

        return mediator as T;
    }

    public sleepMediator<V, T extends Mediator<V>>(mediatorName: string): T {
        const mediator: Mediator<V> = this.mediatorMap[mediatorName];
        if (mediator) {
            if (mediator.isSleeping) {
                return mediator as T;
            }
            this.removeObservers(mediator);

            // alert the mediator that it has been slept
            mediator.onSleep();
        }

        return mediator as T;
    }

    public hasMediator(mediatorName: string): boolean {
        return this.mediatorMap[mediatorName] !== undefined;
    }

    protected initializeView(): void {}

    private removeObservers<V>(mediator: Mediator<V>, interests?: string[]): void {
        // for every notification the mediator is interested in...
        const notificationInterests: string[] = interests || mediator.notifications;
        if (notificationInterests.length > 0) {
            for (const interest of notificationInterests) {
                // interest
                this.removeObserver(interest, mediator.handleNotification, mediator);
            }
        }
    }

    private registerObservers<V>(mediator: Mediator<V>, interests?: string[]): void {
        // get notification interests if any
        const notificationInterests: string[] = interests || mediator.notifications;

        // register mediator as an observer for each notification
        if (notificationInterests.length > 0) {
            for (const interest of notificationInterests) {
                this.registerObserver(interest, mediator.handleNotification, mediator);
            }
        }
    }

    private onMediatorNotificationSubscriptionChange<V>(mediator: Mediator<V>, oldNotifications: string[]): void {
        this.removeObservers(mediator, oldNotifications);
        this.registerObservers(mediator);
    }
}
