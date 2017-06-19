class Shooting implements TankBehavior {
    Tank: gameObject;
    //het gedrag van de tank als hij schiet 
    constructor(T: gameObject) {
        this.Tank = T;
    }

     onShoot() {
        this.Tank.shoot();
    }
    onRight() {
        this.Tank.behavior = new Moving(this.Tank);
    }
    onLeft() {
        this.Tank.behavior = new Moving(this.Tank);
    }
    onUp() {
        this.Tank.behavior = new Moving(this.Tank);
    }
    onDown() {
        this.Tank.behavior = new Moving(this.Tank);
    }
}