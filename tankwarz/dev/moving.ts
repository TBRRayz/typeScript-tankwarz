class Moving implements TankBehavior {
    Tank: gameObject;
    //behavior move als de tank beweegd kan hij niet schieten
    constructor(T: gameObject) {
        this.Tank = T;
    }

    onShoot() {
        this.Tank.behavior = new Shooting(this.Tank);
    }
    onRight() {
        this.Tank.turnRight();
    }
    onLeft() {
        this.Tank.turnLeft();
    }
    onUp() {
        this.Tank.accelerate();
    }
    onDown() {
        this.Tank.decelerate();
    }
}