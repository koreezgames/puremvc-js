/**
 * Created by sargis on 7/6/17.
 */

export default class BoardView extends Phaser.Group {
    public static NAME = "BoardView";

    public static DATA_GET = BoardView.NAME + "DataGet";
    public static DATA_READY = BoardView.NAME + "DataReady";
    public static SHOW = BoardView.NAME + "Show";
    public static HIDE = BoardView.NAME + "Hide";
    public static CELL_CLICK = BoardView.NAME + "CellClick";
    public static PLAYER_SELECT = BoardView.NAME + "PlayerSelect";
    public static PLAYER_DESELECT = BoardView.NAME + "PlayerDeselect";
    public static POSSIBLE_MOVES_READY = BoardView.NAME + "possibleMovesReady";

    public static CEll_EMPTY = 0;
    public static CEll_PLAYER_1 = 1;
    public static CEll_PLAYER_2 = 2;
    public static CEll_OBSTACLE = 3;

    public static CELL_HIGHLIGHT_DUPLICATE = 0;
    public static CELL_HIGHLIGHT_JUMP = 1;

    public onBoardInputUp: Phaser.Signal;
    private cells: any[];
    private highlightedCells: any[];
    private selectedPlayer: PlayerView;

    constructor() {
        super((<any>window).game);
        this.onBoardInputUp = new Phaser.Signal();
        this.alpha = 0;
        this.cells = [];
        this.highlightedCells = [];
    }

    public init(boardVO) {
        for (let i = 0; i < boardVO.height; ++i) {
            const col = [];
            this.cells.push(col);
            for (let j = 0; j < boardVO.width; ++j) {
                const cellView = new CellView(this.game, i, j);
                cellView.inputEnabled = true;
                cellView.events.onInputUp.add(this.onCellInputUp, this);
                col.push(cellView);
                this.add(cellView);
                const cellData = boardVO.cells[i][j];
                if (cellData !== BoardView.CEll_EMPTY) {
                    switch (cellData) {
                        case BoardView.CEll_PLAYER_1:
                            cellView.addView(new PlayerView(this.game, BoardView.CEll_PLAYER_1, PlayerView.RED));
                            break;
                        case BoardView.CEll_PLAYER_2:
                            cellView.addView(new PlayerView(this.game, BoardView.CEll_PLAYER_2, PlayerView.GREEN));
                            break;
                        case BoardView.CEll_OBSTACLE:
                            cellView.addView(new ObstacleView(this.game));
                            break;
                    }
                }
            }
        }
    }

    public show() {
        let tween = this.game.add.tween(this);
        tween.to({ alpha: 1 }, 500);
        tween.start();
    }

    public hide() {
        let tween = this.game.add.tween(this);
        tween.to({ alpha: 0 }, 500);
        tween.start();
    }

    public selectPlayer(position) {
        const playerView = this.cells[position.i][position.j].getView();
        if (playerView) {
            playerView.select();
            this.selectedPlayer = playerView;
        }
    }

    public deselectPlayer() {
        if (this.selectedPlayer) {
            this.selectedPlayer.deselect();
            this.selectedPlayer = null;
        }
    }

    public highlightCells(positions, cellHighlightType = BoardView.CELL_HIGHLIGHT_DUPLICATE) {
        positions.forEach(position => {
            const cellView = this.cells[position.i][position.j];
            let alpha = 1;
            switch (cellHighlightType) {
                case BoardView.CELL_HIGHLIGHT_DUPLICATE:
                    alpha = 1;
                    break;
                case BoardView.CELL_HIGHLIGHT_JUMP:
                    alpha = 0.5;
                    break;
            }
            cellView.highlight(alpha);
            this.highlightedCells.push(cellView);
        });
    }

    public cancelHighlightedCells() {
        this.highlightedCells.forEach(cellView => {
            cellView.cancelHighlight();
        });
    }

    public createPlayer(player, id, color) {
        for (const position of player) {
            const col = position[0];
            const row = position[1];
            const playerView = new PlayerView(this.game, id, color);
            this.cells[col][row].addView(playerView);
        }
    }

    public createObstacles(obstacles) {
        for (const position of obstacles) {
            const col = position[0];
            const row = position[1];
            this.cells[col][row].addView(new ObstacleView(this.game));
        }
    }

    public createBoard(boardVO) {
        for (let i = 0; i < boardVO.height; ++i) {
            const col = [];
            this.cells.push(col);
            for (let j = 0; j < boardVO.width; ++j) {
                const cellView = new CellView(this.game, i, j);
                cellView.inputEnabled = true;
                cellView.events.onInputUp.add(this.onCellInputUp, this);
                col.push(cellView);
                this.add(cellView);
            }
        }
    }

    private onCellInputUp(cellView) {
        this.onBoardInputUp.dispatch({ i: cellView.i, j: cellView.j });
    }
}

class CellView extends Phaser.Sprite {
    public i: any;
    public j: any;
    public highlightSprite: any;
    public view: any;

    constructor(game, i, j) {
        super(game, 32 + i * 64, 32 + j * 64, "tile");
        this.i = i;
        this.j = j;
        this.anchor.setTo(0.5);
        this.highlightSprite = this.game.make.sprite(0, 0, "tile-select");
        this.highlightSprite.anchor.setTo(0.5);
    }

    public addView(view) {
        if (this.view) {
            this.removeChild(this.view);
        }
        this.addChild(view);
        this.view = view;
    }

    public getView() {
        return this.view;
    }

    public highlight(alpha = 1) {
        this.highlightSprite.alpha = alpha;
        this.addChild(this.highlightSprite);
    }

    public cancelHighlight() {
        this.removeChild(this.highlightSprite);
    }
}

class PlayerView extends Phaser.Group {
    public static YELLOW = 1;
    public static RED = 2;
    public static BLUE = 3;
    public static GREEN = 4;

    public id: any;
    public color: any;
    public sprite: any;
    public selectedSprite: any;

    constructor(game, id, color) {
        super(game);
        this.id = id;
        this.color = color;
        this.sprite = this.create(0, 0, "tile-" + this.color);
        this.sprite.anchor.setTo(0.5);
        this.selectedSprite = this.create(0, 0, "tile-" + this.color + "-select");
        this.selectedSprite.anchor.setTo(0.5);
        this.remove(this.selectedSprite);
        this.scale.setTo(0.9);
    }

    public select() {
        this.replace(this.sprite, this.selectedSprite);
    }

    public deselect() {
        this.replace(this.selectedSprite, this.sprite);
    }
}

class ObstacleView extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, "tile-block");
        this.anchor.setTo(0.5);
        this.scale.setTo(0.9);
    }
}
