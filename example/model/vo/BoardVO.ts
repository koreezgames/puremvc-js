/**
 * Created by sargis on 7/4/17.
 */
export default class BoardVO {
    public width: number;
    public height: number;
    public player1: any[];
    public player2: any[];
    public obstacles: any[];
    public cells: any[];

    constructor() {
        this.width = 0;
        this.height = 0;
        this.player1 = [];
        this.player2 = [];
        this.obstacles = [];
    }
}
