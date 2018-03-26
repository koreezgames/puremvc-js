import Mediator from '../patterns/mediator/Mediator';
export default class View {
    static getInstance(key: string): View;
    static removeView(key: string): void;
    private static instanceMap;
    private multitonKey;
    private mediatorMap;
    private eventEmitter;
    constructor(key: string);
    removeObserver(notificationName: string, observerMethod: (notificationName: string, ...args: any[]) => void, context: any): void;
    registerObserver(notificationName: string, observerMethod: (notificationName: string, ...args: any[]) => void, context: any): void;
    notifyObservers(notificationName: string, ...args: any[]): void;
    registerMediator(mediator: Mediator): void;
    retrieveMediator<T extends Mediator>(mediatorName: string): T;
    removeMediator<T extends Mediator>(mediatorName: string): T;
    hasMediator(mediatorName: string): boolean;
    protected initializeView(): void;
}
