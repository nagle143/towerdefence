import Tower from './tower.js';
import Projectile from './projectile.js';

export default class MachineGun extends Tower {
  constructor(x,y) {
    super(x,y);
    this.range = 200;
    this.damage = 5;
    this.width = 12;
    this.height = 9;
    this.RATE = 10;
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
    var x = this.x + Math.sin(direction) * this.height;
    var y = this.y - Math.cos(direction) * this.height;
    this.projectiles.push(new Projectile(x, y, direction, this.color));
  }

  update() {
    super.update();
  }
  render(ctx) {
    super.render(ctx);
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    //Enable accurate rotation
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    //Draw ship
    ctx.moveTo(0, -this.width);
    ctx.lineTo(this.height, this.width);
    ctx.lineTo(0, this.width / 1.5);
    ctx.lineTo(-this.height, this.width);
    ctx.lineTo(0, -this.width);
    ctx.stroke();
    ctx.restore();
  }
}
