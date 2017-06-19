enum GameActive {
    YES,
    NO,
    PAUSE
}

class Game {

    private static instance: Game;

    private tank1: Tank1 = new Tank1(1000, 200);;
    private tank2: Tank2 = new Tank2(100, 200);
    private level: LevelMaps.Level = new LevelMaps.Level();

    private activeGame: GameActive = GameActive.YES;

    constructor() {
        //gameloop aanroepen
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        //als de game actief is
        if (this.activeGame == GameActive.YES) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1280, 720);
            this.level.Update(this.tank1, this.tank2);

            this.tank1.draw();
            this.tank2.draw();

            requestAnimationFrame(() => this.gameLoop());
        } else {
            console.log('The game has not started yet or is on pause.');
        }

    }

    //checken of er al een game instance is
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
} 