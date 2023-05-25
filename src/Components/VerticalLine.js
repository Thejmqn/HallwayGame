import Line from './Line.js';

export default class VerticalLine extends Line {
    constructor(x, y, length) {
      super(x, y, length);
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  
    checkCollision(ball) {
      if (ball.x + ball.dx > this.x - ball.radius && ball.x + ball.dx < this.x + ball.radius && ball.y > this.y && ball.y < this.y + this.length) {
        ball.dx = -ball.dx;
      }
      if(this.x <= ball.x + ball.radius && this.x >= ball.x - ball.radius && ball.y > this.y && ball.y < this.y + this.length) {
        if(this.x > ball.x)
          ball.x = this.x - ball.radius;
        else
          ball.x = this.x + ball.radius;
      }
    }
}