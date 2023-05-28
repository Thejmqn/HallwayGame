import Line from './Line.js';

export default class HorziontalLine extends Line {
    constructor(x, y, length) {
      super(x, y, length);
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.length, this.y);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  
    checkCollision(ball) {
      if (ball.y + ball.dy > this.y - ball.radius && ball.y + ball.dy < this.y + ball.radius && ball.x > this.x && ball.x < this.x + this.length) {
        ball.dy = -ball.dy;
      }
      if(this.y <= ball.y + ball.radius && this.y >= ball.y - ball.radius && ball.x > this.x && ball.x < this.x + this.length) {
        if(this.y > ball.y)
          ball.y = this.y - ball.radius;
        else
          ball.y = this.y + ball.radius;
      }
    }
}