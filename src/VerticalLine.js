import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

class VerticalLine {
    constructor(x, y, length) {
      this.x = percentWidth(x);
      this.y = percentHeight(y);
      this.length = percentWidth(length);
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
    }
}

export default VerticalLine;