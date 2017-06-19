var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.tank = new Tank1(100, 200, "tank1");
        this.tank2 = new Tank2();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.tank.move();
        this.tank.draw();
        this.tank2.move();
        this.tank2.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
var gameObject = (function () {
    function gameObject(tag) {
        this.createDiv(tag);
    }
    gameObject.prototype.createDiv = function (tag) {
        var container = document.getElementById("container");
        this.div = document.createElement(tag);
        container.appendChild(this.div);
    };
    return gameObject;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Tank1 = (function () {
    function Tank1(x, y, tag) {
        var _this = this;
        this.directionX = 0;
        this.directionY = 0;
        this.size = 20;
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 4;
        this.x = x;
        this.y = y;
        this.tag = tag;
        var container = document.getElementById("container");
        this.div = document.createElement(tag);
        container.appendChild(this.div);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Tank1.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                break;
            case 40:
                this.directionY = 1;
                break;
            case 38:
                this.directionY = -1;
                break;
            case 37:
                break;
        }
    };
    Tank1.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 39:
                this.directionX = 0;
                break;
            case 40:
                this.directionY = 0;
                break;
            case 38:
                this.directionY = 0;
                break;
            case 37:
                this.directionX = 0;
                break;
        }
    };
    Tank1.prototype.move = function () {
        this.x = this.x + this.speed * this.directionX;
        console.log("test");
    };
    Tank1.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Tank1;
}());
var Tank2 = (function (_super) {
    __extends(Tank2, _super);
    function Tank2() {
        var _this = _super.call(this, "tank2") || this;
        _this.directionX = 0;
        _this.directionY = 0;
        _this.directionX = 0;
        _this.directionY = 0;
        _this.speed = 4;
        _this.x = 500;
        _this.y = 400;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Tank2.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                break;
            case 83:
                this.directionY = 1;
                break;
            case 87:
                this.directionY = -1;
                break;
            case 68:
                break;
        }
    };
    Tank2.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 65:
                this.directionX = 0;
                break;
            case 83:
                this.directionY = 0;
                break;
            case 87:
                this.directionY = 0;
                break;
            case 68:
                this.directionX = 0;
                break;
        }
    };
    Tank2.prototype.move = function () {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    };
    Tank2.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Tank2;
}(gameObject));
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.normalize = function (magnitude) {
            if (magnitude === void 0) { magnitude = 1; }
            var len = Math.sqrt(_this.x * _this.x + _this.y * _this.y);
            _this.x /= len;
            _this.y /= len;
            return _this;
        };
        this.rotate = function (radians) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var x = (cos * _this.x) + (sin * _this.y);
            var y = (cos * _this.y) - (sin * _this.x);
            _this.x = x;
            _this.y = y;
        };
        this.getAngle = function () {
            return Math.atan2(_this.y, _this.x);
        };
        this.multiply = function (value) {
            _this.x *= value;
            _this.y *= value;
        };
        this.add = function (value) {
            _this.x += value.x;
            _this.y += value.y;
        };
        this.subtract = function (value) {
            _this.x -= value.x;
            _this.y -= value.y;
        };
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
//# sourceMappingURL=main.js.map