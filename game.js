/*global key*/

(function (root) {
  var S = root.S = ( root.S || {} );
  var Game = S.Game = function () {
    this.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.board = new S.Board(this.DIM_WIDTH, this.DIM_HEIGHT, this.ctx);
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
    this.bindKeys();
    setInterval(this.board.draw.bind(this.board), 1000/30);
  };
  
  Game.prototype.bindKeys = function () {
    key("w, up", this.board.snake.turn.bind(this.board.snake, "U"));
    key("d, left", this.board.snake.turn.bind(this.board.snake, "L"));
    key("s, down", this.board.snake.turn.bind(this.board.snake, "D"));
    key("a, right", this.board.snake.turn.bind(this.board.snake, "R"));
  };
  
})(this);

var game = new this.S.Game();
