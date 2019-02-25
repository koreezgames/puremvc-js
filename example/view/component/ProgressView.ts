/**
 * Created by sargis on 7/5/17.
 */

export default class ProgressView extends Phaser.Group {
    public static NAME = "ProgressView";
    public static SHOW = ProgressView.NAME + "Show";
    public static HIDE = ProgressView.NAME + "Hide";
    public static UPDATE = ProgressView.NAME + "Update";

    private textField: any;

    constructor() {
        super((<any>window).game);
        this.init();
    }

    public init() {
        const style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        this.textField = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Please wait...", style);
        this.textField.anchor.set(0.5);
    }

    public show() {
        this.textField.text = "Please wait...";
        this.textField.alpha = 0;
        this.add(this.textField);
        let tween = this.game.add.tween(this.textField);
        tween.to({ alpha: 1 }, 500);
        tween.start();
    }

    public hide() {
        this.add(this.textField);
        let tween = this.game.add.tween(this.textField);
        tween.to({ alpha: 0 }, 500);
        tween.start();
    }

    public updatePercent(percent) {
        this.textField.text = "Loaded " + percent + "%";
    }
}
