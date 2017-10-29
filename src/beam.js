
export default class Beam {
  constructor(x, y, width, length, direction, color) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = width * 0.80;
    this.length = length;
    this.color = color;
    this.life = 100;
    this.alpha = 1.0;
  }
  update() {
    this.life--;
    this.alpha -= 0.01;
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(-this.width / 2, 0, this.width, this.length);
    ctx.restore();
    ctx.restore();
  }
}
