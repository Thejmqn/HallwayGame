import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';
import HorziontalLine from './HorziontalLine.js';
import VerticalLine from './VerticalLine.js';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

class PlayerBall {
    constructor(speed, x, y, radius, lines) {
      this.dx = percentWidth(speed);
      this.dy = percentHeight(speed);
      this.x = percentWidth(x);
      this.y = percentHeight(y);
      this.radius = percentWidth(radius);
      this.up = false;
      this.left = false;
      this.down = false;
      this.right = false;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.lines = lines;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      if(this.up) 
        this.y -= this.dy;
      if(this.left)
        this.x -= this.dx;
      if(this.down)
        this.y += this.dy;
      if(this.right)
        this.x += this.dx;
      this.stayInBounds();
      this.linesCollision();
      ctx.fill();
      ctx.closePath();
    }
  
    moveUp() {
      this.up = true;
    }
  
    moveLeft() {
      this.left = true
    }
  
    moveDown() {
      this.down = true;
    }
  
    moveRight() {
      this.right = true;
    }
  
    stopMoveUp() {
      this.up = false;
    }
  
    stopMoveLeft() {
      this.left = false;
    }
  
    stopMoveDown() {
      this.down = false;
    }
  
    stopMoveRight() {
      this.right = false;
    }
  
    stayInBounds(width, height) {
      if (this.x < this.radius) {
        this.x = this.radius;
      }
      if (this.x > this.canvasWidth - this.radius) {
        this.x = this.canvasWidth - this.radius;
      }
      if (this.y < this.radius) {
        this.y = this.radius;
      }
      if (this.y > this.canvasHeight - this.radius) {
        this.y = this.canvasHeight - this.radius;
      }
    }
  
    linesCollision() {
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        if(line instanceof HorziontalLine) {
          if (this.y - this.radius < line.y && this.y + this.radius > line.y && this.x + this.radius > line.x && this.x - this.radius < line.x + line.length) {
            if (this.y < line.y) {
              this.y = line.y - this.radius;
            } else {
              this.y = line.y + this.radius;
            }
          }
        }
        else if(line instanceof VerticalLine) {
          if (this.x - this.radius < line.x && this.x + this.radius > line.x && this.y + this.radius > line.y && this.y - this.radius < line.y + line.length) {
            if (this.x < line.x) {
              this.x = line.x - this.radius;
            } else {
              this.x = line.x + this.radius;
            }
          }
        }
      }
    }
  
    ballCollision(otherBall) {
      const dx = this.x - otherBall.x;
      const dy = this.y - otherBall.y;
      const offset = 10;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance + offset< this.radius + otherBall.radius;
    }
}

export default PlayerBall;