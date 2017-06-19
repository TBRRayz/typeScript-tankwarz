class Collision {
    constructor() {

    }

    //functie die checkt of 2 objecten elkaar rakken.
    hasOverlap(c1: gameObject, c2: Wall): boolean {

        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    }
}