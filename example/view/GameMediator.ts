/**
 * Created by sargis on 7/4/17.
 */
import { Mediator } from "../../src/index";
import GameState from "../state/GameState";
import BoardView from "./component/BoardView";
import BoardViewMediator from "./component/BoardViewMediator";
import ProgressViewMediator from "./component/ProgressViewMediator";

export default class GameMediator extends Mediator<Phaser.World> {
    public static NAME = "ApplicationMediator";

    constructor() {
        super(GameMediator.NAME, (<any>window).game.world);
        this.subscribeNotification(GameState.READY);
    }

    public onAwake(): void {
        super.onAwake();
        this.facade.registerMediator(new ProgressViewMediator());
    }

    public handleNotification(notificationName: string, ...args: any[]) {
        switch (notificationName) {
            case GameState.READY:
                this.facade.registerMediator(new BoardViewMediator());
                this.facade.sendNotification(BoardView.DATA_GET);
                break;
        }
    }
}
