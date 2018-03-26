import Proxy from '../patterns/proxy/Proxy';
export default class Model {
    static getInstance(key: string): Model;
    static removeModel(key: string): void;
    private static instanceMap;
    private multitonKey;
    private proxyMap;
    constructor(key: string);
    registerProxy<T extends Proxy>(proxy: T): void;
    retrieveProxy<T extends Proxy>(proxyName: string): T;
    hasProxy(proxyName: string): boolean;
    removeProxy<T extends Proxy>(proxyName: string): T;
    protected initializeModel(): void;
}
