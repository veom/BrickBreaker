﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;

var Ball = (function () {
    function Ball() {
        this.radius = 5;
        this.x = 400;
        this.y = 300;
        this.speedX = 5;
        this.speedY = 5;
    }
    Ball.prototype.update = function (boundx, boundy) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > boundx || this.x < 0)
            this.speedX = -this.speedX;
        if (this.y > boundy || this.y < 0)
            this.speedY = -this.speedY;
    };

    Ball.prototype.render = function (context) {
        context.fillStyle = "rgb(255,0,0)";
        context.beginPath();
        context.arc(this.x - this.radius, this.y - this.radius, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
    };
    return Ball;
})();

var Brick = (function () {
    function Brick(x, y) {
        this.colour = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        this.width = 50;
        this.height = 10;
        this.alive = true;
        this.x = x * this.width;
        this.y = y * this.height + 50;
    }
    Brick.prototype.render = function (context, x, y) {
        if (this.alive) {
            context.fillStyle = this.colour;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    return Brick;
})();

var Player = (function (_super) {
    __extends(Player, _super);
    function Player(maxPosition) {
        _super.call(this, 0, 0);
        this.x = (maxPosition / 2) - 25;
        this.y = 380;
        this.colour = "rgb(0,0,0)";
        this.maxPosition = maxPosition;
    }
    Player.prototype.moveLeft = function () {
        this.x -= 10;

        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
    };

    Player.prototype.moveRight = function () {
        this.x += 10;

        if (this.x > this.maxPosition - this.width / 2) {
            this.x = this.maxPosition - this.width / 2;
        }
    };

    Player.prototype.render = function (context) {
        context.fillStyle = this.colour;
        context.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    };
    return Player;
})(Brick);

var BrickBreaker = (function () {
    function BrickBreaker(canvas) {
        this.canvas = canvas;
        this.bricks = new Array(5);
        this.player = new Player(canvas.width);
        this.ball = new Ball();

        for (var i = 0; i < this.bricks.length; i++) {
            this.bricks[i] = new Array(16);
            for (var j = 0; j < this.bricks[i].length; j++) {
                this.bricks[i][j] = new Brick(j, i);
            }
        }

        var fps = 30;
        this.renderTimer = setInterval(function () {
            game.update();
            game.render();
        }, fps);
    }
    BrickBreaker.prototype.update = function () {
        this.ball.update(this.canvas.width, this.canvas.height);
    };

    BrickBreaker.prototype.render = function () {
        var context = this.canvas.getContext("2d");
        context.fillStyle = "rgb(255, 255,255)";
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.render(context);
        this.ball.render(context);

        for (var y = 0; y < this.bricks.length; y++) {
            for (var x = 0; x < this.bricks[y].length; x++) {
                var brick = this.bricks[y][x];
                brick.render(context, x, y);
            }
        }
    };

    BrickBreaker.prototype.play = function () {
        this.update();
        this.render();
    };

    BrickBreaker.prototype.input = function (event) {
        //Left arrow;
        if (event.keyCode === 37) {
            game.player.moveLeft();
        }

        //Right arrow;
        if (event.keyCode === 39) {
            game.player.moveRight();
        }
    };
    return BrickBreaker;
})();

window.onload = function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    game = new BrickBreaker(canvas);
    document.onkeydown = game.input;
};
//# sourceMappingURL=app.js.map
