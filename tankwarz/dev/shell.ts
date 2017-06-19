/**
 * Ball
 */
class shell {

    public x: number;
    public y: number;
    public width: number = 20;
    public height: number = 20;

    public Vector: Vector = new Vector(0, 0);
    public getPath: boolean = true;

    private speed: number = 5;
    private alive: boolean = true;

    public tank: gameObject;
    public Image: HTMLImageElement;

    constructor(tank: gameObject) {

        this.tank = tank;

        this.Image = new Image(this.width, this.height);
        this.Image.src = "images/shell.png";

        this.x = this.tank.velocity.x + 10;
        this.y = this.tank.velocity.y;

    }

    public update(tank: Vector): void {
        // als de kogel afgevuurd word een richting mee geven.
        if (this.getPath == true) {
            this.Vector.copy(tank);
            this.Vector.multiply(-10);
            this.getPath = false;
        }

        this.draw();
    }

    public draw(): void {
        //kogel tekken
        this.x += this.Vector.x;
        this.y += this.Vector.y;

        ctx.save();
        ctx.translate(this.tank.x, this.tank.y);
        ctx.drawImage(this.Image, 0 - this.x, 0 - this.y);
        ctx.restore();

    }

}