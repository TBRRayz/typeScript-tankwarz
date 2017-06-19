/// <reference path="gameObject.ts" />


class Tank2 extends gameObject {

    constructor(x: number, y: number) {
        super()
        this.x = x;
        this.y = y;

        this.behavior = new Moving(this);

        this.Image = new Image(this.width, this.height);
        this.Image.src = "images/tank2.png";

        window.addEventListener("keydown", (e) => this.onKeyDown(e));


    }
    private onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {

            case 68: //D
                this.behavior.onRight();
                break;

            case 83: //W
                this.behavior.onDown();
                break;
            case 87: //S
                this.behavior.onUp();
                break;

            case 65: //A
                this.behavior.onLeft();
                break;

            case 17: //CTRL
                this.behavior.onShoot();
                break;
        }

    }


    public update(): void {

        if (this.shellAlive == true) {
            for (var i = 0; i < this.shellAray.length; i++) {

                this.shellAray[i].update(this.orientation);
            }
        }

    }

    public draw = (): void => {
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