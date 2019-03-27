/**
 * Created by sargis on 7/4/17.
 */
import { Notifier } from "./Notifier";
import { PureMVC } from "./PureMVC";

const NAME: string = "Proxy";

export class Proxy<T> extends Notifier {
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
    private logger: (consoleArgs: string[], name: string, action: string) => void;

    constructor(proxyName: string, data: T) {
        super();
        this.proxyName = proxyName || NAME;
        this.logger = PureMVC.debug ? PureMVC.logProxy : PureMVC.logNone;
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
        this.logger(Proxy._consoleArgs, this.constructor.name, "register");
    }

    public onRemove(): void {
        this.logger(Proxy._consoleArgs, this.constructor.name, "remove");
    }
}
