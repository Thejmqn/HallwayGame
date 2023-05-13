import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

class HorziontalLine {
    constructor(x, y, length) {
      this.x = percentWidth(x);
      this.y = percentHeight(y);
      this.length = percentWidth(length);
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
    }
}
  
export default HorziontalLine;