import Notifier from '../observer/Notifier';

export default abstract class SimpleCommand extends Notifier {
  public abstract execute(notificationName: string, ...args: any[]): void;
}
