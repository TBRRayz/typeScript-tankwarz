class Wall {

    public x: number;
    public y: number;
    public width: number = 40;
    public height: number = 40;

    public tank: gameObject;

    public Imagewall1: HTMLImageElement;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.Imagewall1 = new Image(40, 40);
        this.Imagewall1.src = "images/wall1.gif";
        this.Draw();
    }

    public Draw(): void {

        ctx.drawImage(this.Imagewall1, this.x, this.y);

    }
}
