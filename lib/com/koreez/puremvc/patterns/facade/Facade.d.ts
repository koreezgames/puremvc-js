import SimpleCommand from '../command/SimpleCommand';
import Mediator from '../mediator/Mediator';
import Proxy from '../proxy/Proxy';
export default class Facade {
    static getInstance(key: string): Facade;
    static hasCore(key: string): boolean;
    static removeCore(key: string): void;
    protected static instanceMap: {
        [key: string]: Facade;
    };
    private model;
    private view;
    private controller;
    private multitonKey;
    constructor(key: string);
    initializeFacade(): void;
    registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    removeCommand(notificationName: string): void;
    hasCommand(notificationName: string): boolean;
    registerProxy<T extends Proxy>(proxy: T): void;
    retrieveProxy<T extends Proxy>(proxyName: string): T;
    removeProxy<T extends Proxy>(proxyName: string): T;
    hasProxy(proxyName: string): boolean;
    registerMediator<V, T extends Mediator<V>>(mediator: T): void;
    retrieveMediator<V, T extends Mediator<V>>(mediatorName: string): T;
    removeMediator<V, T extends Mediator<V>>(mediatorName: string): T;
    hasMediator(mediatorName: string): boolean;
    sendNotification(notificationName: string, ...args: any[]): void;
    notifyObservers(notificationName: string, ...args: any[]): void;
    initializeNotifier(key: string): void;
    protected initializeController(): void;
    protected initializeModel(): void;
    protected initializeView(): void;
}
