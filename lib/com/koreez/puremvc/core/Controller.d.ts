import SimpleCommand from '../patterns/command/SimpleCommand';
export default class Controller {
    static removeController(key: string): void;
    static getInstance(key: string): Controller;
    private static instanceMap;
    private commandMap;
    private multitonKey;
    private view;
    constructor(key: string);
    registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
    protected initializeController(): void;
    protected executeCommand(notificationName: string, ...args: any[]): void;
}
