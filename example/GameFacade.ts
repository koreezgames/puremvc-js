/**
 * Created by sargis on 7/4/17.
 */
import { Facade } from "../src/index";
import { boardCommand, dataCommand, startupCommand } from "./controller/Commands";
import BoardView from "./view/component/BoardView";

export default class GameFacade extends Facade {
    public static getInstance(key: string) {
        if (!Facade.instanceMap[key]) {
            Facade.instanceMap[key] = new GameFacade(key);
        }
        return Facade.instanceMap[key];
    }
    public static KEY = "Example";
    public static NAME = "ExampleFacade";
    public static STARTUP = GameFacade.NAME + "StartUp";

    public startup(game) {
        this.sendNotification(GameFacade.STARTUP, game);
    }

    public sendNotification(notificationName: string, ...args: any[]) {
        console.log("Sent " + notificationName);
        super.sendNotification(notificationName, ...args);
    }

    public initializeController() {
        super.initializeController();
        this.registerCommand(GameFacade.STARTUP, startupCommand);
        this.registerCommand(BoardView.DATA_GET, dataCommand);
        this.registerCommand(BoardView.CELL_CLICK, boardCommand);
        this.registerCommand(BoardView.PLAYER_SELECT, boardCommand);
    }
}
