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
var Collision = (function () {
    function Collision() {
    }
    Collision.prototype.hasOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Collision;
}());
var GameActive;
(function (GameActive) {
    GameActive[GameActive["YES"] = 0] = "YES";
    GameActive[GameActive["NO"] = 1] = "NO";
    GameActive[GameActive["PAUSE"] = 2] = "PAUSE";
})(GameActive || (GameActive = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.tank1 = new Tank1(1000, 200);
        this.tank2 = new Tank2(100, 200);
        this.level = new LevelMaps.Level();
        this.activeGame = GameActive.YES;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    ;
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.activeGame == GameActive.YES) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1280, 720);
            this.level.Update(this.tank1, this.tank2);
            this.tank1.draw();
            this.tank2.draw();
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
        else {
            console.log('The game has not started yet or is on pause.');
        }
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
    function gameObject() {
        this.velocity = new Vector(0, 0);
        this.orientation = new Vector(0, 0);
        this.maxSpeed = 50;
        this.maxSpeedSQ = 100;
        this.acceleration = 1;
        this.rotation = 0;
        this._tempPoint = new Vector(0, 0);
        this.width = 50;
        this.height = 61;
        this.shellAray = new Array();
        this.shellAlive = false;
    }
    Object.defineProperty(gameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(gameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    gameObject.prototype.accelerate = function () {
        this.velocity.copy(this.orientation);
        this.velocity.multiply(this.acceleration);
        this._tempPoint.copy(this.orientation);
        this._tempPoint.multiply(this.acceleration);
        this.velocity.add(this._tempPoint);
        if (this.velocity.magSq() >= this.maxSpeedSQ) {
            this.velocity.multiply(this.maxSpeed / this.velocity.magnitude());
        }
    };
    gameObject.prototype.decelerate = function () {
        this.velocity.multiply(0.5);
        if (this.velocity.magSq() < 1) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    };
    gameObject.prototype.turnLeft = function () {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.rotation -= 0.1;
        if (this.rotation < 0) {
            this.rotation += Math.PI * 2;
        }
        this.orientation.x = 1;
        this.orientation.y = 0;
        this.orientation.rotate(-this.rotation);
    };
    gameObject.prototype.turnRight = function () {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.rotation += 0.1;
        this.rotation %= Math.PI * 2;
        this.orientation.x = 1;
        this.orientation.y = 0;
        this.orientation.rotate(-this.rotation);
    };
    gameObject.prototype.shoot = function () {
        console.log('shoot tank');
        this.shellAray.push(new shell(this));
        if (this.shellAlive == false) {
            this.shellAlive = true;
        }
    };
    return gameObject;
}());
var LevelMaps;
(function (LevelMaps) {
    var Level = (function () {
        function Level() {
            this.WallArray = new Array();
            this.collision = new Collision();
        }
        Level.prototype.Update = function (T1, T2) {
            for (var i = 0; i < 1280; i += 40) {
                this.WallArray.push(new Wall(i, 0));
            }
            for (var i = 0; i < 1280; i += 40) {
                this.WallArray.push(new Wall(i, 640));
            }
            for (var i = 0; i < 200; i += 40) {
                this.WallArray.push(new Wall(i, 320));
            }
            for (var i = 1280; i > 1040; i -= 40) {
                this.WallArray.push(new Wall(i, 320));
            }
            for (var i = 480; i < 800; i += 40) {
                this.WallArray.push(new Wall(i, 160));
            }
            for (var i = 160; i < 480; i += 40) {
                this.WallArray.push(new Wall(i, 520));
            }
            for (var i = 800; i < 1120; i += 40) {
                this.WallArray.push(new Wall(i, 520));
            }
            for (var i = 0; i < 640; i += 40) {
                this.WallArray.push(new Wall(0, i));
            }
            for (var i = 0; i < 640; i += 40) {
                this.WallArray.push(new Wall(1240, i));
            }
            for (var i = 0; i < 300; i += 40) {
                this.WallArray.push(new Wall(320, i));
            }
            for (var i = 0; i < 300; i += 40) {
                this.WallArray.push(new Wall(920, i));
            }
            for (var i = 640; i > 340; i -= 40) {
                this.WallArray.push(new Wall(600, i));
            }
            for (var i = 640; i > 340; i -= 40) {
                this.WallArray.push(new Wall(640, i));
            }
            this.tank1 = T1;
            this.tank2 = T2;
            for (var i = 0; i < this.WallArray.length; i++) {
                if (this.collision.hasOverlap(this.tank1, this.WallArray[i])) {
                }
            }
        };
        return Level;
    }());
    LevelMaps.Level = Level;
})(LevelMaps || (LevelMaps = {}));
var canvas;
var ctx;
window.addEventListener("load", function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    var g = Game.getInstance();
});
var Moving = (function () {
    function Moving(T) {
        this.Tank = T;
    }
    Moving.prototype.onShoot = function () {
        this.Tank.behavior = new Shooting(this.Tank);
    };
    Moving.prototype.onRight = function () {
        this.Tank.turnRight();
    };
    Moving.prototype.onLeft = function () {
        this.Tank.turnLeft();
    };
    Moving.prototype.onUp = function () {
        this.Tank.accelerate();
    };
    Moving.prototype.onDown = function () {
        this.Tank.decelerate();
    };
    return Moving;
}());
var shell = (function () {
    function shell(tank) {
        this.width = 20;
        this.height = 20;
        this.Vector = new Vector(0, 0);
        this.getPath = true;
        this.speed = 5;
        this.alive = true;
        this.tank = tank;
        this.Image = new Image(this.width, this.height);
        this.Image.src = "images/shell.png";
        this.x = this.tank.velocity.x + 10;
        this.y = this.tank.velocity.y;
    }
    shell.prototype.update = function (tank) {
        if (this.getPath == true) {
            this.Vector.copy(tank);
            this.Vector.multiply(-10);
            this.getPath = false;
        }
        this.draw();
    };
    shell.prototype.draw = function () {
        this.x += this.Vector.x;
        this.y += this.Vector.y;
        ctx.save();
        ctx.translate(this.tank.x, this.tank.y);
        ctx.drawImage(this.Image, 0 - this.x, 0 - this.y);
        ctx.restore();
    };
    return shell;
}());
var Shooting = (function () {
    function Shooting(T) {
        this.Tank = T;
    }
    Shooting.prototype.onShoot = function () {
        this.Tank.shoot();
    };
    Shooting.prototype.onRight = function () {
        this.Tank.behavior = new Moving(this.Tank);
    };
    Shooting.prototype.onLeft = function () {
        this.Tank.behavior = new Moving(this.Tank);
    };
    Shooting.prototype.onUp = function () {
        this.Tank.behavior = new Moving(this.Tank);
    };
    Shooting.prototype.onDown = function () {
        this.Tank.behavior = new Moving(this.Tank);
    };
    return Shooting;
}());
var Tank1 = (function (_super) {
    __extends(Tank1, _super);
    function Tank1(x, y) {
        var _this = _super.call(this) || this;
        _this.draw = function () {
            _this.update();
            _this.x += _this.velocity.x;
            _this.y += _this.velocity.y;
            ctx.save();
            ctx.translate(_this.x, _this.y);
            ctx.rotate(_this.rotation);
            ctx.drawImage(_this.Image, 0 - _this.width / 2, 0 - _this.height / 2);
            ctx.restore();
        };
        _this.x = x;
        _this.y = y;
        _this.behavior = new Moving(_this);
        _this.Image = new Image(_this.width, _this.height);
        _this.Image.src = "images/tank.png";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Tank1.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                this.behavior.onRight();
                break;
            case 40:
                this.behavior.onDown();
                break;
            case 38:
                this.behavior.onUp();
                break;
            case 37:
                this.behavior.onLeft();
                break;
            case 32:
                this.behavior.onShoot();
                break;
        }
    };
    Tank1.prototype.update = function () {
        if (this.shellAlive == true) {
            for (var i = 0; i < this.shellAray.length; i++) {
                this.shellAray[i].update(this.orientation);
            }
        }
    };
    return Tank1;
}(gameObject));
var Tank2 = (function (_super) {
    __extends(Tank2, _super);
    function Tank2(x, y) {
        var _this = _super.call(this) || this;
        _this.draw = function () {
            _this.update();
            _this.x += _this.velocity.x;
            _this.y += _this.velocity.y;
            ctx.save();
            ctx.translate(_this.x, _this.y);
            ctx.rotate(_this.rotation);
            ctx.drawImage(_this.Image, 0 - _this.width / 2, 0 - _this.height / 2);
            ctx.restore();
        };
        _this.x = x;
        _this.y = y;
        _this.behavior = new Moving(_this);
        _this.Image = new Image(_this.width, _this.height);
        _this.Image.src = "images/tank2.png";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Tank2.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 68:
                this.behavior.onRight();
                break;
            case 83:
                this.behavior.onDown();
                break;
            case 87:
                this.behavior.onUp();
                break;
            case 65:
                this.behavior.onLeft();
                break;
            case 17:
                this.behavior.onShoot();
                break;
        }
    };
    Tank2.prototype.update = function () {
        if (this.shellAlive == true) {
            for (var i = 0; i < this.shellAray.length; i++) {
                this.shellAray[i].update(this.orientation);
            }
        }
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
        this.magnitude = function () {
            return Math.sqrt(_this.x * _this.x + _this.y * _this.y);
        };
        this.magSq = function () {
            return _this.x * _this.x + _this.y * _this.y;
        };
        this.normalize = function (magnitude) {
            if (magnitude === void 0) { magnitude = 1; }
            var len = Math.sqrt(_this.x * _this.x + _this.y * _this.y);
            _this.x /= len;
            _this.y /= len;
            return _this;
        };
        this.zero = function () {
            _this.x = 0;
            _this.y = 0;
        };
        this.copy = function (point) {
            _this.x = point.x;
            _this.y = point.y;
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
var Wall = (function () {
    function Wall(x, y) {
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.Imagewall1 = new Image(40, 40);
        this.Imagewall1.src = "images/wall1.gif";
        this.Draw();
    }
    Wall.prototype.Draw = function () {
        ctx.drawImage(this.Imagewall1, this.x, this.y);
    };
    return Wall;
}());
//# sourceMappingURL=main.js.map