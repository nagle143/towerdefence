import Particle from './particles.js';
import Tower from './tower.js';
import Tracks from './tracks.js';
import MachineGun from './machinegun.js';
import BeamGun from './beamgun.js';
import Enemy from './enemy.js';

/** @function Math.randomBetween()
  * Math prototype function built to easily create ranom floats
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random float between the parameters
  */
Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

/** @function Math.randomBetween()
  * Math prototype function built to easily create ranom integers
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random integer between the parameters
  */
Math.randomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default class Game {
  constructor() {
    //Variable for width/height of canvas and initializing objects
    this.screenSide = 1000;
    //Major Objects and Arrays
    this.towers = [];
    this.towers.push(new BeamGun(600,600));
    this.towers.push(new MachineGun(500, 500));
    this.towers.push(new MachineGun(300, 300));
    this.tracks = new Tracks();
    this.enemy = new Enemy(this.tracks.path);
    this.particles = [];
    //variables
    this.money = 0;
    //Loop variables

    //Input Map

    //Audio Objects

    //HUD
    this.HUDcanvas = document.getElementById('ui');
    this.HUDcanvas.width = this.screenSide;
    this.HUDcanvas.height = 100;
    this.HUDcontext = this.HUDcanvas.getContext('2d');
    document.body.appendChild(this.HUDcanvas);

    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = this.screenSide;
    this.backBufferCanvas.height = this.screenSide;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = this.screenSide;
    this.screenBufferCanvas.height = this.screenSide;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.loop = this.loop.bind(this);
    this.render = this.render.bind(this);

    //60fps (1000/60 = 50/3)
    this.interval = setInterval(this.loop, 50/3);
  }

    /** @function explode()
    * function to create explosion particle effects
    * @param floats x, y - position of explosion
    * @param string color - determines the color of particles to be created
    */
  explode(x, y, color) {
    var numParticles = Math.randomInt(30, 70);
    var dir = Math.randomBetween(0, Math.PI * 2);
    for(var i = 0; i < numParticles; i ++) {
      if(Math.randomInt(0, 100) > 90) {
        dir = Math.randomBetween(0, Math.PI * 2);
      }
      this.particles.push(new Particle(x, y, Math.PI * dir, 3, color, 20));
    }
  }

  update() {
    //update particles
    for(let j = 0; j < this.particles.length; j++) {
      this.particles[j].update();
      if(this.particles[j].life <= 0) {
        this.particles.splice(j, 1);
      }
    }
    this.towers.forEach(tower => {
      tower.update();
      if(tower.rateOfFire === tower.RATE) {
        tower.shoot(Math.randomBetween(100, 900), Math.randomBetween(100, 900));
        tower.rateOfFire--;
      }
      else {
        tower.rateOfFire--;
        if(tower.rateOfFire <= 0) {
          tower.rateOfFire = tower.RATE;
        }
      }
    });
    this.enemy.update();
  }

  /** @function render()
    * standard render function, calls all other render funcitons and drawHUD
    */
  render() {
    //Initial Setup
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.strokeStyle = 'blue';
    this.backBufferContext.font = '50px Times New Roman';
    //Refresh canvas
    this.backBufferContext.fillRect(0,0, this.screenSide, this.screenSide);
    //draw particles
    this.particles.forEach(particle => {
      particle.render(this.backBufferContext);
    });
    this.towers.forEach(tower => {
      tower.render(this.backBufferContext);
    });
    this.tracks.render(this.backBufferContext);
    this.enemy.render(this.backBufferContext);

    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }

  loop() {
    this.update();
    this.render();
  }
}
