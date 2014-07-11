(function (root) {
  var S = root.S = ( root.S || {} );
  var Coord = S.Coord = function (x, y, ctx, color) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.color = color;
  };
  
  Coord.prototype.draw = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 10, 10);
  };
  
  Coord.prototype.plus = function (x, y) {
    var newX = this.x + x;
    var newY = this.y + y;
    
    return new Coord(newX, newY, this.ctx, this.color);
  };
})(this);
