import MacroCommand from './MacroCommand';
import SimpleCommand from './SimpleCommand';
export default class AsyncMacroCommand<T extends SimpleCommand> extends MacroCommand<T> {
    execute(notificationName: string, ...args: any[]): Promise<void>;
}
