import MacroCommand from './MacroCommand';
import SimpleCommand from './SimpleCommand';

export default class SyncMacroCommand<
  T extends SimpleCommand
> extends MacroCommand<T> {
  public execute(notificationName: string, ...args: any[]): void {
    while (this.subCommands.length > 0) {
      const ref: new () => T = this.subCommands.shift();
      const cmd: T = new ref();
      cmd.initializeNotifier(this.multitonKey);
      cmd.execute(notificationName, ...args);
    }
  }
}
