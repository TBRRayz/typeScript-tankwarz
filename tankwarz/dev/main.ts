var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

// load
window.addEventListener("load", function () {
    //het canvas maken en inladen en de game aanmaken
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    let g = Game.getInstance();
});