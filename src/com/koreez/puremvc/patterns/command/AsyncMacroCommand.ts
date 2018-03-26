import MacroCommand from './MacroCommand';
import SimpleCommand from './SimpleCommand';

export default class AsyncMacroCommand<
  T extends SimpleCommand
> extends MacroCommand<T> {
  public async execute(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    while (this.subCommands.length > 0) {
      const ref: new () => T = this.subCommands.shift();
      const cmd: T = new ref();
      cmd.initializeNotifier(this.multitonKey);
      await cmd.execute(notificationName, ...args);
    }
  }
}
