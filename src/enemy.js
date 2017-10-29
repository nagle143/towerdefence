
export default class Enemy {
  constructor(path) {
    this.path = path;
    this.x = this.path[0].x;
    this.y = this.path[0].y;
    this.checkpoints = [];
    this.check = 1;
    this.initCheckpoints();
    this.speed = 1.0;
    this.direction = 0;
    this.health = 100;
    this.armor = 1.0;
    this.bounty = 10;
  }
  initCheckpoints() {
    for(let i = 0; i < this.path.length; i++) {
      this.checkpoints.push(false);
    }
  }
  update() {
    if(this.x > this.path[this.check].x) {
      this.x -= this.speed;
    }
    else if (this.x < this.path[this.check].x) {
      this.x += this.speed;
    }
    if(this.y > this.path[this.check].y) {
      this.y -= this.speed;
    }
    else if (this.y < this.path[this.check].y) {
      this.y += this.speed;
    }
    if(this.x === this.path[this.check].x && this.y === this.path[this.check].y) {
      this.check++;
      if(this.check === this.path.length) {
        this.check = 1;
        this.x = this.path[0].x;
        this.y = this.path[0].y;
      }
    }
  }
  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
