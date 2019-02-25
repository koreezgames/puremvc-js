/**
 * Created by sargis on 7/4/17.
 */
import Notifier from "../observer/Notifier";

const NAME: string = "Proxy";

export default class Proxy<T> extends Notifier {
    private static readonly _consoleArgs: string[] = [
        "",
        `background: ${"#295A34"}`,
        `background: ${"#2FAA4A"}`,
        `color: ${"#102415"}; background: ${"#27D04C"};`,
        `background: ${"#2FAA4A"}`,
        `background: ${"#295A34"}`
    ];

    private proxyName: string;
    private data: T;
    constructor(proxyName: string, data: T) {
        super();
        this.proxyName = proxyName || NAME;
        if (data) {
            this.setData(data);
        }
    }

    public getProxyName(): string {
        return this.proxyName;
    }

    public setData(data: T): void {
        this.data = data;
    }

    public getData(): T {
        return this.data;
    }

    public onRegister(): void {
        Proxy._consoleArgs[0] = `%c %c %c ${this.constructor.name}: register %c %c `;
        console.log.apply(console, Proxy._consoleArgs);
    }

    public onRemove(): void {
        Proxy._consoleArgs[0] = `%c %c %c ${this.constructor.name}: remove %c %c `;
        console.log.apply(console, Proxy._consoleArgs);
    }
}
