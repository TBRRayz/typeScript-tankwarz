/// <reference path="Collision.ts" />

namespace LevelMaps {
    export class Level {

        public WallArray: Array<Wall> = new Array<Wall>();
        public tank1: Tank1;
        public tank2: Tank2;
        public collision: Collision = new Collision();

        constructor() {

        }

        public Update(T1: Tank1, T2: Tank2): void {
            //het tekenen van de muren
            //buiten muur boven
            for (var i = 0; i < 1280; i += 40) {
                this.WallArray.push(new Wall(i, 0));
            }
            //buiten muur benden
            for (var i = 0; i < 1280; i += 40) {
                this.WallArray.push(new Wall(i, 640));
            }
            //links horizontaal
            for (var i = 0; i < 200; i += 40) {
                this.WallArray.push(new Wall(i, 320));
            }
            //rechts horizontaal
            for (var i = 1280; i > 1040; i -= 40) {
                this.WallArray.push(new Wall(i, 320));
            }
            //midden boven horizontaal
            for (var i = 480; i < 800; i += 40) {
                this.WallArray.push(new Wall(i, 160));
            }
            //links onder horizontaal
            for (var i = 160; i < 480; i += 40) {
                this.WallArray.push(new Wall(i, 520));
            }
            //rechts onder horizontaal
            for (var i = 800; i < 1120; i += 40) {
                this.WallArray.push(new Wall(i, 520));
            }
            //links buiten
            for (var i = 0; i < 640; i += 40) {
                this.WallArray.push(new Wall(0, i));
            }
            //rechts buiten
            for (var i = 0; i < 640; i += 40) {
                this.WallArray.push(new Wall(1240, i));
            }
            //links verticaal binnen
            for (var i = 0; i < 300; i += 40) {
                this.WallArray.push(new Wall(320, i));
            }
            //rects verticaal binnen
            for (var i = 0; i < 300; i += 40) {
                this.WallArray.push(new Wall(920, i));
            }
            //verticaal dubbele muur
            for (var i = 640; i > 340; i -= 40) {
                this.WallArray.push(new Wall(600, i));
            }
            for (var i = 640; i > 340; i -= 40) {
                this.WallArray.push(new Wall(640, i));
            }

            this.tank1 = T1;
            this.tank2 = T2;

            //begin van de collision detectie
            for (var i = 0; i < this.WallArray.length; i++) {
                if (this.collision.hasOverlap(this.tank1, this.WallArray[i])) {
                    //console.log("tank1hint");
                    /*
                    this.tank1.velocity.x = 0;
                    this.tank1.velocity.y = 0;
                    */
                }
            }
        }
    }
}
