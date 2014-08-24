/*global key*/

(function (root) {
  var S = root.S = ( root.S || {} );
  var Game = S.Game = function () {
    this.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.board = new S.Board(this.DIM_WIDTH, this.DIM_HEIGHT, this.ctx);
    
    this.bindKeys();
  };
  
  Game.prototype.createCanvas = function () {
    var canvas = this.canvas = document.createElement("canvas");
    
    canvas.style.height = "400px";
    canvas.style.width = "400px";
    canvas.style.boxSizing = "border-box";
    canvas.style.border =  "5px solid black";
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    this.DIM_WIDTH = canvas.offsetWidth;
    this.DIM_HEIGHT = canvas.offsetHeight;
    
    canvas.width = this.DIM_WIDTH;
    canvas.height = this.DIM_HEIGHT;
  };
  
  Game.prototype.run = function () {
    this.interval = setInterval(this.gameLoop.bind(this), 1000/30);
  };
  
  Game.prototype.gameLoop = function () {
      this.board.draw();
      if (!this.board.snake.alive) {
          this.board.gameOverDraw();
          clearInterval(this.interval);
      }
  };
  
  Game.prototype.bindKeys = function () {
    key("w, up", this.board.snake.turn.bind(this.board.snake, "U"));
    key("d, left", this.board.snake.turn.bind(this.board.snake, "L"));
    key("s, down", this.board.snake.turn.bind(this.board.snake, "D"));
    key("a, right", this.board.snake.turn.bind(this.board.snake, "R"));
    key("space", this.run.bind(this));
  };
  
})(this);

var game = new this.S.Game();
