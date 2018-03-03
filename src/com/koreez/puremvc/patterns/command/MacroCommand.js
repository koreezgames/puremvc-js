/**
 * Created by sargis on 7/4/17.
 */
import SimpleCommand from './SimpleCommand'
/**
 * A base command implementation that executes other commands, such as
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or {@link puremvc.MacroCommand MacroCommand}
 * subclasses.
 *
 * A MacroCommand maintains an list of
 * command constructor references called *SubCommands*.
 *
 * When #execute is called, the MacroCommand
 * instantiates and calls #execute on each of its *SubCommands* in turn.
 * Each *SubCommand* will be passed a reference to the original
 * {@link puremvc.Notification Notification}
 * that was passed to the MacroCommands #execute method
 *
 * Unlike {@link puremvc.SimpleCommand SimpleCommand},
 * your subclass should not override #execute but instead, should
 * override the #initializeMacroCommand method, calling #addSubCommand once for
 * each *SubCommand* to be executed.
 *
 * If your subclass does define a constructor, be sure to call "super"
 *
 * @constructor
 */
export default class MacroCommand extends SimpleCommand {
  constructor () {
    super()
    this.subCommands = []
    this.initializeMacroCommand()
  }

  /**
   * @protected
   * Initialize the MacroCommand.
   *
   * In your subclass, override this method to
   * initialize the MacroCommand's *SubCommand*
   * list with command class references
   *
   * Note that *SubCommand*s may be any command implementor,
   * MacroCommands or SimpleCommands are both acceptable.
   * @return {void}
   */
  initializeMacroCommand () { }

  /**
   * @protected
   * Add a *SubCommand*
   *
   * The *SubCommand*s will be called in First In / First Out (FIFO) order
   * @param {Function} commandClassRef
   *  A reference to a subclassed SimpleCommand or MacroCommand constructor
   */
  addSubCommand (subCommand) {
    this.subCommands.push(subCommand)
  }
}
