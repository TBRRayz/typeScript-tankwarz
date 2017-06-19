/// <reference path="gameObject.ts" />


class Tank1 extends gameObject {

    constructor(x: number, y: number) {
        super()
        this.x = x;
        this.y = y;

        this.behavior = new Moving(this);

        this.Image = new Image(this.width, this.height);
        this.Image.src = "images/tank.png";

        window.addEventListener("keydown", (e) => this.onKeyDown(e));


    }
    private onKeyDown(event: KeyboardEvent): void {
        //als een toetsenbord knop omlaag is een behavior uitvoeren 
        switch (event.keyCode) {

            case 39: //RIGHT
                this.behavior.onRight();
                break;

            case 40: //dOWN
                this.behavior.onDown();
                break;
            case 38: //UP
                this.behavior.onUp();
                break;

            case 37: //LEFT
                this.behavior.onLeft();
                break;

            case 32: //space
                this.behavior.onShoot();
                break;
        }

    }

    public update(): void {
        //update van de tank hier word de update van de kogel aangroepen.
        if (this.shellAlive == true) {
            for (var i = 0; i < this.shellAray.length; i++) {

                this.shellAray[i].update(this.orientation);
            }
        }

    }

    public draw = (): void => {
        //teken de tank
        this.update();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.Image, 0 - this.width / 2, 0 - this.height / 2);

        ctx.restore();
    }

}