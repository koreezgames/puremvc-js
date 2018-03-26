/**
 * Created by sargis on 7/4/17.
 */
import Facade from '../facade/Facade';
export default class Notifier {
    protected facade: Facade;
    protected multitonKey: string;
    initializeNotifier(key: string): void;
    protected sendNotification(notificationName: string, ...args: any[]): void;
    private getFacade();
}
