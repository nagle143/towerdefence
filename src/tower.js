import Particle from './particles.js';
import Projectile from './projectile.js';

export default class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.range = 100;
    this.damage = 0.0;
    this.direction = 0.0;
    this.RATE = 0;
    this.rateOfFire = this.RATE;
    this.color = 'green';
    this.particles = [];
    this.projectiles = [];
  }
  checkRange(projectile) {
    var dx = this.x - projectile.x;
    var dy = this.y - projectile.y;
    if(dx * dx + dy * dy > this.range * this.range) {
      return true;
    }
    return false;
  }
  update() {
    //update particles
    for(let j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
    //update projectiles
    for(let j = 0; j < this.projectiles.length; j++) {
      this.projectiles[j].update();
      if(this.checkRange(this.projectiles[j])) {
        this.projectiles.splice(j, 1);
      }
    }
  }
  render(ctx) {
    //draw particles
    this.particles.forEach(particle => {
      particle.render(ctx);
    });
    //draw projectiles
    this.projectiles.forEach(projectile => {
      projectile.render(ctx);
    });
  }
}
