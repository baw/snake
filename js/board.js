(function (root) {
  var S = root.S = ( root.S || {} );
  var Board = S.Board = function (width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    
    this.snake = new S.Snake(this.width / 2, this.height / 2, ctx);
    
    this.appleColor = "red";
    this.apples = [];
    this.addApple();
  };
  
  Board.prototype.addApple = function () {
    var x = this.random(this.width - 10, 0);
    var y = this.random(this.height - 10, 0);
    var newApple = new S.Coord(x, y, this.ctx, this.appleColor);
    
    this.apples.push(newApple);
  };
  
  Board.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.snake.move();
    
    this.ifHitAppleRemoveAndGrowSnakeAndAddNewApple();
    
    if (this.snake.hasHitBoard(this.width, this.height)) {
      this.snake.alive = false;
      console.log("Board");
    }
      
    if (this.snake.hasHitSelf()) {
      console.log("self");
    }
    
    this.drawApples();
    this.snake.draw();
  };
  
  Board.prototype.drawApples = function () {
    for (var i = 0; i < this.apples.length; i++) {
      this.apples[i].draw();
    }
  };
  
  Board.prototype.gameOverDraw = function () {
      this.ctx.fillStyle = "#eee";
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      this.ctx.fillStyle = "black";
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText("Game Over", 140, 150);
  };
  
  Board.prototype.ifHitAppleRemoveAndGrowSnakeAndAddNewApple = function () {
    for (var i = 0; i < this.apples.length; i++) {
      if (this.snake.hasHit(this.apples[i])) {
        this.snake.grow(this.apples[i]);
        this.apples.splice(i, 1);
        
        this.addApple();
        
        return true;
      }
    }
    
    return false;
  };
  
  Board.prototype.random = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
})(this);
