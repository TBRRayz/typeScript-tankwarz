# Tankwarz

ik ben tankwarz aan het maken dat is een spel voor 2 spellers waar bij je alle 2 een tank bent en op elkaar kan schieten.
een tank bestuur je met ASWD en CTRL de andere met de pijltjes en spaties.

## Programmeerprincipes toegepast

## interface

    interface TankBehavior {
    Tank: gameObject;

    onShoot();
    onRight();
    onLeft();
    onUp();
    onDown();
}

Hier is een interface gemaakt, die tegelijkertijd dient als een Strategy Pattern.

## Strategy Pattern

    interface TankBehavior {
    Tank: gameObject;

    onShoot();
    onRight();
    onLeft();
    onUp();
    onDown();
}

In de tank class:

    this.behavior = new Moving(this);

In de moving class:

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

Als Strategy Pattern heb ik TankBehavior gemaakt die kan bewegen of schieten.


## Singleton


        public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    let g = Game.getInstance();

singleton zit in het aanroepen van de game.
    
## Namespaces

    namespace LevelMaps {
    export class Level {


kan je aanroepen op de volgende manier:
    
    private level: LevelMaps.Level = new LevelMaps.Level();


## Enumerations

        enum GameActive {
        YES,
        NO,
        PAUSE
    }

        private activeGame: GameActive = GameActive.YES;

        if (this.activeGame == GameActive.YES) {
            // hier kan je gameloop als het spel actief is
        } else {
            console.log('The game has not started yet or is on pause.');
        }

Enumerations gebruikt bij het controleren of de game active is of niet. Kan je ook gebruiken als je een pause functie erin wil hebben. 

## Inheritance

    class Tank1 extends gameObject {

    constructor(x: number, y: number) {
        super()
        this.x = x;
        this.y = y;

    Gebruik maken van extensions


























