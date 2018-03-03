import MacroCommand from './MacroCommand'
export default class AsyncMacroCommand extends MacroCommand {
  async execute (notificationName, ...args) {
    while (this.subCommands.length > 0) {
      const ref = this.subCommands.shift()
      // eslint-disable-next-line new-cap
      const cmd = new ref()
      cmd.initializeNotifier(this.multitonKey)
      await cmd.execute(notificationName, ...args)
    }
  }
}
