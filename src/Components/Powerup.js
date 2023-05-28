import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

export default class Powerup {
  static defaultLength = 1;
  static defaultLifespan = 1000;

  constructor(x, y, length, ct, ls) {
    this.x = percentWidth(x);
    this.y = percentHeight(y);
    this.length = percentWidth(length);
    this.lifespan = ls;
    this.deleteTime = ct + ls;
    this.existenceTime = 0;
  }

  draw(ctx) {
    this.manageState(ctx);
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.length, this.length);
    ctx.fill();
    this.existenceTime++;
  }

  manageState(ctx) {
    let percentTime = Math.round(100*this.existenceTime/this.lifespan);
    if(percentTime < 25)
      ctx.fillStyle = 'green';
    else if(percentTime < 50)
      ctx.fillStyle = 'yellow';
    else if(percentTime < 75)
      ctx.fillStyle = 'orange';
    else if(percentTime < 100)
      ctx.fillStyle = 'red';
    else
      this.x = -1000;
  }
}