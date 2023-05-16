import React, { useRef, useEffect } from 'react';
import PlayerBall from './Components/PlayerBall.js';
import Ball from './Components/Ball.js';
import Level from './Level.js';
import Level1 from './Levels/Level1.js';

const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

function Canvas() {
  const canvasRef = useRef(null);
  const level = new Level(Level1);
  const balls = level.balls;
  const lines = level.lines;
  const playerBall = new PlayerBall(0.25, 50, 50, 1, lines);
  let score = 0;

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
          window.alert("You lose! Score: " + score);
          playerBall.x = -1000;
          playerBall.y = -1000;
          window.location.reload();
        }
      }
      playerBall.draw(ctx);
      ctx.font = "30px Verdana"
      ctx.fillText("Score: " + score, 0, 30)
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
        case 'p':
          level.newBall();
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
      score++;
    }, 10);

  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
}

export default Canvas;