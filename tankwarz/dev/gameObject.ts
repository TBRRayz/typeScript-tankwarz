/**
 * gameObject
 */
abstract class gameObject {

    private _x: number;
    private _y: number;

    public get x(): number          {   return this._x;   }
    public set x(value: number)     {   this._x = value;  }

    public get y(): number          {   return this._y;   }
    public set y(value: number)     {   this._y = value;  }  

    public velocity: Vector = new Vector(0, 0);
    public orientation: Vector = new Vector(0, 0);
    public maxSpeed: number = 50;
    public maxSpeedSQ: number = 100;
    public acceleration: number = 1;

    public rotation: number = 0;
    public _tempPoint: Vector = new Vector(0, 0);

    public behavior: TankBehavior;

    public Image: HTMLImageElement;
    public width: number = 50;
    public height: number = 61;

    public shellAray: Array<shell> = new Array<shell>();
    public shellAlive: boolean = false;

    constructor() {


    }

    public accelerate(): void {
        //naar voren bewegen van de tank
        this.velocity.copy(this.orientation);
        this.velocity.multiply(this.acceleration);

        this._tempPoint.copy(this.orientation);
        this._tempPoint.multiply(this.acceleration);
        this.velocity.add(this._tempPoint);
        if (this.velocity.magSq() >= this.maxSpeedSQ) {
            this.velocity.multiply(this.maxSpeed / this.velocity.magnitude());
        }

    }

    public decelerate(): void {
        //het afremen van de tank
        this.velocity.multiply(0.5);

        if (this.velocity.magSq() < 1) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    public turnLeft(): void {
        //links omdraaien van de tank
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.rotation -= 0.1;
        if (this.rotation < 0) {
            this.rotation += Math.PI * 2;
        }
        this.orientation.x = 1;
        this.orientation.y = 0;
        this.orientation.rotate(-this.rotation);
    }

    public turnRight(): void {
        //rechts omdraaien van de tank
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.rotation += 0.1;
        this.rotation %= Math.PI * 2;
        this.orientation.x = 1;
        this.orientation.y = 0;
        this.orientation.rotate(-this.rotation);
    }

    public shoot(): void {
        console.log('shoot tank');

        this.shellAray.push(new shell(this));
        if (this.shellAlive == false) {
            this.shellAlive = true;
        }

    }


}
