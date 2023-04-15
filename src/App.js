import React, { useRef, useEffect } from 'react';

class Line {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
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
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
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
  constructor(speed, x, y, radius, canvasWidth, canvasHeight, lines) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.radius = radius;
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
      this.y -= this.speed;
    if(this.left)
      this.x -= this.speed;
    if(this.down)
      this.y += this.speed;
    if(this.right)
      this.x += this.speed;
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

  linesCollision(){
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
}

function Canvas() {
  const canvasRef = useRef(null);
  const balls = [
    new Ball(50, 50, 5, 2, 2),
    new Ball(100, 100, 10, 3, 3),
    new Ball(200, 200, 20, 4, 4)
  ];
  const lines = [
    new Line(0, 300, 200),
    new Line(400, 100, 150)
  ];
  const playerBall = new PlayerBall(2, 50, 50, 20, 800, 600, lines);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      clearCanvas();
      for (let i = 0; i < lines.length; i++) {
        lines[i].draw(ctx);
      }
      for (let i = 0; i < balls.length; i++) {
        balls[i].draw(ctx);
      }
      playerBall.draw(ctx);
    }

    function move() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].move(canvas, lines);
      }
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
    <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
  );
}

export default Canvas;