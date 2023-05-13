import React, { useRef, useEffect } from 'react';
import PlayerBall from './Components/PlayerBall.js';
import Level from './Level.js';
import Level1 from './Levels/Level1.js';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

function Canvas() {
  const canvasRef = useRef(null);
  const level1 = new Level(Level1);
  const balls = level1.balls;
  const lines = level1.lines;
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
          window.alert("You lose");
          playerBall.x = -1000;
          playerBall.y = -1000;
          window.location.reload();
        }
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
      draw();
      move();
    }, 10);

  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
}

export default Canvas;