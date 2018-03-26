/**
 * Created by sargis on 7/4/17.
 */
import Notifier from '../observer/Notifier';
export default class Proxy extends Notifier {
    private proxyName;
    private data;
    constructor(proxyName: string, data: any);
    getProxyName(): string;
    setData(data: any): void;
    getData(): any;
    onRegister(): void;
    onRemove(): void;
}
