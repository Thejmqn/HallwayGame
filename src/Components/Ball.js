import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

export default class Ball {
  static test = "";
  static maxRadius = 25;
  static maxSpeed = 0.35;
  static minRadius = 10;
  static minSpeed = 0.05;

  constructor(x, y, radius, speed) {
    this.x = percentWidth(x);
    this.y = percentHeight(y);
    this.radius = radius;
    this.dx = percentWidth(speed);
    this.dy = percentHeight(speed);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  move(canvas, lines) {
    if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvasHeight - this.radius || this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    }
  
    for (let i = 0; i < lines.length; i++) {
      lines[i].checkCollision(this);
    }

    if(this.y < this.radius)
      this.y = this.radius;
    if(this.y > canvasHeight-this.radius)
      this.y = canvasHeight-this.radius;
    if(this.x < this.radius)
      this.x = this.radius;
    if(this.x > canvasWidth-this.radius)
      this.x = canvasWidth-this.radius;

    this.x += this.dx;
    this.y += this.dy;
  }
}