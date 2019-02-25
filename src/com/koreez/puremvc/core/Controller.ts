import View from "./View";

export type Command = (multitonKey: string, notificationName?: string, ...args: any[]) => any;

export default class Controller {
    public static removeController(key: string): void {
        delete this.instanceMap[key];
    }

    public static getInstance(key: string): Controller {
        if (!key) {
            return null;
        }

        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new Controller(key);
        }

        return this.instanceMap[key];
    }

    private static instanceMap: { [key: string]: Controller } = {};

    private commandMap: { [key: string]: Command } = {};
    private multitonKey: string;
    private view: View;

    constructor(key: string) {
        if (Controller.instanceMap[key]) {
            throw new Error(MULTITON_MSG);
        }

        this.multitonKey = key;
        this.initializeController();
    }

    public registerCommand(notificationName: string, commandClassRef: Command): void {
        if (!this.commandMap[notificationName]) {
            this.view.registerObserver(notificationName, this.executeCommand, this);
        }
        this.commandMap[notificationName] = commandClassRef;
    }

    public hasCommand(notificationName: string): boolean {
        return this.commandMap[notificationName] !== undefined;
    }

    public removeCommand(notificationName: string): void {
        if (this.hasCommand(notificationName)) {
            this.view.removeObserver(notificationName, this.executeCommand, this);
            delete this.commandMap[notificationName];
        }
    }

    protected initializeController(): void {
        this.view = View.getInstance(this.multitonKey);
    }

    protected executeCommand(notificationName: string, ...args: any[]): void {
        const command: Command = this.commandMap[notificationName];
        if (!command) {
            return;
        }
        command(this.multitonKey, notificationName, ...args);
    }
}

const MULTITON_MSG: string = "controller key for this Multiton key already constructed";
