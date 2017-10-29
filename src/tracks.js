
export default class Tracks {
  constructor() {
    this.path = [];
    this.initTracks();
  }
  initTracks() {
    this.path.push({x:50, y:0});
    this.path.push({x:50, y: 300});
    this.path.push({x:600, y: 300});
    this.path.push({x:600, y: 700});
    this.path.push({x:50, y: 700});
    this.path.push({x:50, y: 900});
    this.path.push({x:800, y: 900});
    this.path.push({x:800, y: 100});
    this.path.push({x:1000, y: 100});

    console.log(this.path);
    console.log(this.path[0].x);
  }
  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'violet';
    ctx.fillStyle = 'violet';
    ctx.beginPath();
    ctx.moveTo(this.path[0].x, this.path[0].y);
    for(let i = 1; i < this.path.length; i++) {
      ctx.lineTo(this.path[i].x, this.path[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }
}
