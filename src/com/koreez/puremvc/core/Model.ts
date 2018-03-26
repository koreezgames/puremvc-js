import Proxy from '../patterns/proxy/Proxy';

export default class Model {
  public static getInstance(key: string): Model {
    if (!key) {
      return null;
    }

    if (!this.instanceMap[key]) {
      this.instanceMap[key] = new Model(key);
    }

    return this.instanceMap[key];
  }

  public static removeModel(key: string): void {
    delete this.instanceMap[key];
  }
  private static instanceMap: { [key: string]: Model } = {};

  private multitonKey: string;
  private proxyMap: { [key: string]: Proxy } = {};

  constructor(key: string) {
    if (Model.instanceMap[key]) {
      throw new Error(MULTITON_MSG);
    }
    this.multitonKey = key;
    this.initializeModel();
  }

  public registerProxy<T extends Proxy>(proxy: T): void {
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()] = proxy;
    proxy.onRegister();
  }

  public retrieveProxy<T extends Proxy>(proxyName: string): T {
    return this.proxyMap[proxyName] as T;
  }

  public hasProxy(proxyName: string): boolean {
    return this.proxyMap[proxyName] !== undefined;
  }

  public removeProxy<T extends Proxy>(proxyName: string): T {
    if (this.proxyMap[proxyName]) {
      const proxy: T = this.proxyMap[proxyName] as T;
      proxy.onRemove();
      delete this.proxyMap[proxyName];
      return proxy;
    }
    return null;
  }

  protected initializeModel(): void {}
}

const MULTITON_MSG: string =
  'Model instance for this Multiton key already constructed!';
