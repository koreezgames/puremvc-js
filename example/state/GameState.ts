/**
 * Created by sargis on 7/6/17.
 */

import { Facade } from "../../src/index";
import GameFacade from "../GameFacade";
import ProgressView from "../view/component/ProgressView";

export default class GameState extends Phaser.State {
    public static NAME = "GameState";
    public static READY = GameState.NAME + "Ready";

    private facade: GameFacade;

    public init(...args: any[]) {
        this.game.renderer.renderSession.roundPixels = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.facade = <GameFacade>Facade.getInstance(GameFacade.KEY);
        this.facade.startup(this);
    }

    public preload() {
        this.load.onLoadStart.addOnce(this.onLoadStart, this);
        this.load.onFileComplete.add(this.onFileComplete, this);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.pack("initial", "static/assets/assets.json");
        this.load.start();
    }

    public create() {
        this.facade.sendNotification(GameState.READY);
    }

    private onLoadStart() {
        this.facade.sendNotification(ProgressView.SHOW);
    }

    private onFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        this.facade.sendNotification(ProgressView.UPDATE, progress);
    }

    private onLoadComplete() {
        this.facade.sendNotification(ProgressView.HIDE);
    }
}
