/**
 * Created by sargis on 7/5/17.
 */
import { Mediator } from "../../../src/index";
import ProgressView from "./ProgressView";

export default class ProgressViewMediator extends Mediator<ProgressView> {
    public static NAME = "ProgressViewMediator";

    constructor() {
        super(ProgressViewMediator.NAME);
        this.subscribeNotification([ProgressView.SHOW, ProgressView.HIDE, ProgressView.UPDATE]);
    }

    public onRegister(notificationSubscriptionChange: <V>(mediator: Mediator<V>, oldNotifications: string[]) => void) {
        super.onRegister(notificationSubscriptionChange);
        this.viewComponent = new ProgressView();
        (<any>window).game.world.add(this.viewComponent);
    }

    public handleNotification(notificationName: string, ...args: any[]) {
        switch (notificationName) {
            case ProgressView.SHOW:
                this.viewComponent.show();
                break;
            case ProgressView.HIDE:
                this.viewComponent.hide();
                break;
            case ProgressView.UPDATE:
                this.viewComponent.updatePercent(args[0]);
                break;
        }
    }
}
