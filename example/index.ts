/**
 * Created by sargis on 7/4/17.
 */
import "pixi";
import "phaser-ce";
import { Facade, PureMVC } from "../src/index";
import config from "./config";
import GameFacade from "./GameFacade";
import GameState from "./state/GameState";

export default class Game extends Phaser.Game {
    // STATES
    private static STATE_GAME = "Game";

    constructor() {
        super(config.gameWidth, config.gameHeight, Phaser.CANVAS, "", null);
        this.state.add(Game.STATE_GAME, new GameState());
        PureMVC.debug = true;
        Facade.getInstance = GameFacade.getInstance;
    }

    public init() {
        this.state.start(Game.STATE_GAME);
    }
}

(<any>window).game = new Game();
(<any>window).game.init();
