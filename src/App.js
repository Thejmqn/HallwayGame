import React, { useRef, useEffect } from 'react';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

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

  checkCollision(ball, playerBall) {
    if (ball.y + ball.dy > this.y - ball.radius && ball.y + ball.dy < this.y + ball.radius && ball.x > this.x && ball.x < this.x + this.length) {
      ball.dy = -ball.dy;
    }
  }
}

class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
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
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    }
  
    for (let i = 0; i < lines.length; i++) {
      lines[i].checkCollision(this);
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

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
      if (this.y - this.radius < line.y && this.y + this.radius > line.y && this.x + this.radius > line.x && this.x - this.radius < line.x + line.length) {
        if (this.y < line.y) {
          this.y = line.y - this.radius;
        } else {
          this.y = line.y + this.radius;
        }
      }
    }
  }

  ballCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + otherBall.radius;
  }
}

function Canvas() {
  const canvasRef = useRef(null);
  const balls = [
    new Ball(50, 50, 5, 0.3),
    new Ball(100, 100, 10, 0.2),
    new Ball(200, 200, 20, 0.25)
  ];
  const lines = [
    new HorziontalLine(5, 10, 40),
    new HorziontalLine(50, 70, 20),
    new HorziontalLine(50, 40, 30)
  ];
  const playerBall = new PlayerBall(0.25, 50, 50, 1, lines);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function draw() {
      clearCanvas();
      for (let i = 0; i < lines.length; i++) {
        lines[i].draw(ctx);
      }
      for (let i = 0; i < balls.length; i++) {
        balls[i].draw(ctx);
        if (playerBall.ballCollision(balls[i])) {
          console.log('Player ball collided with another ball!');
        }
      }
      playerBall.draw(ctx);
    }

    function move() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].move(canvas, lines);
      }
    }
    
    function intersects(circle1, circle2) {
      const dx = circle1.x - circle2.x;
      const dy = circle1.y - circle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < circle1.radius + circle2.radius;
    }

    document.addEventListener('keypress', (event) => {
      switch (event.key) {
        case 'w':
          playerBall.moveUp();
          break;
        case 'a':
          playerBall.moveLeft();
          break;
        case 's':
          playerBall.moveDown();
          break;
        case 'd':
          playerBall.moveRight();
          break;
        default:
          break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'w':
          playerBall.stopMoveUp();
          break;
        case 'a':
          playerBall.stopMoveLeft();
          break;
        case 's':
          playerBall.stopMoveDown();
          break;
        case 'd':
          playerBall.stopMoveRight();
          break;
        default:
          break;
      }
    });

    setInterval(() => {
      move();
      draw();
    }, 10);

  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
}

function percentWidth(num) {
  return num*0.01*canvasWidth;
}

function percentHeight(num) {
  return num*0.01*canvasHeight;
}

export default Canvas;