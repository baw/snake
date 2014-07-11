(function (root) {
  var S = root.S = ( root.S || {} );
  var Snake = S.Snake = function (startX, startY, ctx) {
    this.COLOR = "#00F";
    
    this.direction = "U";
    this.segments = [new S.Coord(startX, startY, ctx, this.COLOR)];
    this.ctx = ctx;
  };
  
  var DIFFS = {
    "U" : [0, -5],
    "R" : [5,  0],
    "D" : [0,  5],
    "L" : [-5, 0]
  };
  
  var directionInverse = {
    "U" : "D",
    "L" : "R",
    "D" : "U",
    "R" : "L"
  };
  
  Snake.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i].draw();
    }
  };
  
  Snake.prototype.face = function () {
    return this.segments.slice(-1)[0];
  };
  
  Snake.prototype.grow = function (apple) {
    apple.color = this.COLOR;
    
    this.segments.unshift(apple);
  };
  
  Snake.prototype.hasHit = function (object) {
    var segment = this.face();
    
    var diffX = Math.abs(segment.x - object.x);
    var diffY = Math.abs(segment.y - object.y);
      
    return diffX < 10 && diffY < 10;
  };
  
  Snake.prototype.hasHitBoard = function (width, height) {
    var face = this.face();
    
    return this.face.x > width  || this.face.x < 0 ||
           this.face.y > height || this.face.y < 0;
  };
  
  Snake.prototype.hasHitSelf = function () {
    return this.segments.slice(0, -1).some(this.hasHit.bind(this));
  };
  
  Snake.prototype.move = function () {
    var diff = DIFFS[this.direction];
    var newestSegment = this.face();
    
    var nextSegment = newestSegment.plus(diff[0], diff[1]);
    
    this.segments.push(nextSegment);
    
    this.segments.shift();
  };
  
  Snake.prototype.turn = function (newDirection) {
    if (directionInverse[this.direction] !== newDirection) {
      this.direction = newDirection;
    }
  };
})(this);
