import Tower from './tower.js';
import Particle from './particles.js';
import Beam from './beam.js';

export default class BeamGun extends Tower {
  constructor(x, y) {
    super(x,y);
    this.range = 200;
    this.damage = 10;
    this.height = 20;
    this.width = 12;
    this.color = 'blue';
    this.beam = null;
    this.RATE = 200;
    this.rateOfFire = this.RATE;
  }
  shoot(x,y) {
    var dx = this.x - x;
    var dy = this.y - y;
    //Draw a line to the target
    var distance = Math.sqrt(dx * dx + dy * dy);
    //Get the direction to the target
    var direction = Math.acos((dy)/ distance);
    //Mirror the angle for the left hand side
    if(dx > 0) {
      direction *= -1;
    }
    this.direction = direction;
    var x = this.x + Math.sin(direction) * this.height / 2;
    var y = this.y - Math.cos(direction) * this.height / 2;
    this.beam = new Beam(x, y, this.width, this.range, direction, this.color);
  }
  update() {
    if(this.beam) {
      this.beam.update();
      if(this.beam.life <= 0) {
        this.beam = null;
      }
    }
  }
  render(ctx) {
    super.render(ctx);
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
    if(this.beam) {
      this.beam.render(ctx);
    }
  }
}
