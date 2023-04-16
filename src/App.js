import React, { useRef, useEffect } from 'react';
import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';
import HorziontalLine from './HorziontalLine.js';
import VerticalLine from './VerticalLine.js';
import Ball from './Ball.js';
import PlayerBall from './PlayerBall.js';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

function Canvas() {
  const canvasRef = useRef(null);

  const balls = [
    new Ball(Math.random()*100, Math.random()*100, 5, 0.3),
    new Ball(Math.random()*100, Math.random()*100, 10, 0.2),
    new Ball(Math.random()*100, Math.random()*100, 20, 0.25)
  ];
  const lines = [
    new HorziontalLine(5, 10, 40),
    new HorziontalLine(50, 70, 20),
    new HorziontalLine(50, 40, 30),
    new VerticalLine(60, 40, 20)
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