/**
 * Created by sargis on 7/4/17.
 */
import Notifier from "../observer/Notifier";

export default class Proxy<T> extends Notifier {
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

    public onRegister(): void {}

    public onRemove(): void {}
}

const NAME: string = "Proxy";
