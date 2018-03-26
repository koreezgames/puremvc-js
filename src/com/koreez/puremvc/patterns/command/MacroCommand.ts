import SimpleCommand from './SimpleCommand';

export default abstract class MacroCommand<
  T extends SimpleCommand
> extends SimpleCommand {
  protected subCommands: Array<new () => T>;

  constructor() {
    super();
    this.subCommands = [];
    this.initializeMacroCommand();
  }

  protected initializeMacroCommand(): void {}

  protected addSubCommand(subCommand: new () => T): void {
    this.subCommands.push(subCommand);
  }
}
