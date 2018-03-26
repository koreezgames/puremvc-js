import MacroCommand from './MacroCommand';
import SimpleCommand from './SimpleCommand';
export default class SyncMacroCommand<T extends SimpleCommand> extends MacroCommand<T> {
    execute(notificationName: string, ...args: any[]): void;
}
