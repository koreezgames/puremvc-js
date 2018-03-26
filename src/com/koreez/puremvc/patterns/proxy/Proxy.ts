/**
 * Created by sargis on 7/4/17.
 */
import Notifier from '../observer/Notifier';

export default class Proxy extends Notifier {
  private proxyName: string;
  private data: string;
  constructor(proxyName: string, data: any) {
    super();
    this.proxyName = proxyName || NAME;
    if (data) {
      this.setData(data);
    }
  }

  public getProxyName(): string {
    return this.proxyName;
  }

  public setData(data: any): void {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }

  public onRegister(): void {}

  public onRemove(): void {}
}

const NAME: string = 'Proxy';
