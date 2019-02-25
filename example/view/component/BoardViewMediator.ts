/**
 * Created by sargis on 7/6/17.
 */
import { Mediator } from "../../../src/index";
import BoardView from "./BoardView";

export default class BoardViewMediator extends Mediator<BoardView> {
    public static NAME = "ImagesViewMediator";

    constructor() {
        super(BoardView.NAME);
        this.subscribeNotification([
            BoardView.DATA_READY,
            BoardView.PLAYER_SELECT,
            BoardView.PLAYER_DESELECT,
            BoardView.POSSIBLE_MOVES_READY
        ]);
    }

    public onRegister() {
        this.viewComponent = new BoardView();
        this.viewComponent.onBoardInputUp.add(this.onBoardViewInputUp, this);
        (<any>window).game.world.add(this.viewComponent);
    }

    public handleNotification(notificationName, ...args) {
        const body = args[0];
        switch (notificationName) {
            case BoardView.DATA_READY:
                this.viewComponent.init(body);
                this.viewComponent.show();
                break;
            case BoardView.PLAYER_SELECT:
                this.viewComponent.selectPlayer(body);
                break;
            case BoardView.PLAYER_DESELECT:
                this.viewComponent.deselectPlayer();
                this.viewComponent.cancelHighlightedCells();
                break;
            case BoardView.POSSIBLE_MOVES_READY:
                this.viewComponent.highlightCells(body.duplicateMoves, BoardView.CELL_HIGHLIGHT_DUPLICATE);
                this.viewComponent.highlightCells(body.jumpMoves, BoardView.CELL_HIGHLIGHT_JUMP);
                break;
        }
    }

    private onBoardViewInputUp(position) {
        console.log("onBoardViewInputUp : i = " + position.i + ", j=" + position.j);
        this.sendNotification(BoardView.CELL_CLICK, position);
    }
}
