import React, { useRef, useEffect } from 'react';
import PlayerBall from './Components/PlayerBall.js';
import Level from './Level.js';
import Level1 from './Levels/Level1.js';
import Powerup from './Components/Powerup.js';

//global canvas width and height
const canvasWidth = window.innerWidth-16;
const canvasHeight = window.innerHeight;

export default function Canvas() {
  //define game objects from imported level file
  const canvasRef = useRef(null);
  const level = new Level(Level1);
  const balls = level.balls;
  const lines = level.lines;
  const powerups = [new Powerup(20, 20, Powerup.defaultLength, 0, Powerup.defaultLifespan), new Powerup(80, 80, Powerup.defaultLength, 0, Powerup.defaultLifespan)];
  const playerBall = new PlayerBall(0.25, 50, 50, 1, lines);
  let score = 0;
  let power = 0;
  let gameClock = 0;

  useEffect(() => {
    //set up canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    //"main" function to updates canvas
    function draw() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //ball behavior
      for (let i = 0; i < balls.length; i++) {
        balls[i].move(canvas, lines);
        balls[i].draw(ctx);
        if (playerBall.ballCollision(balls[i])) {
          window.alert("You lose! Score: " + score);
          playerBall.x = -1000;
          playerBall.y = -1000;
          window.location.reload();
        }
      }

      //line behavior
      for (let i = 0; i < lines.length; i++) {
        lines[i].update(ctx);
      }

      //powerup behavior
      for(let i = 0; i < powerups.length; i++) {
        powerups[i].draw(ctx, gameClock);
        if(playerBall.powerUpCollision(powerups[i])) {
          powerups.splice(i, 1);
          power++;
        }
      }

      //draw text and score
      playerBall.draw(ctx);
      ctx.font = "30px Verdana";
      ctx.fillStyle = "black";
      ctx.fillText("Score: " + score, 0, 30);
      ctx.fillText("Powerups: " + power, 0, 70);
      
      //update score and game clock
      score++;
      gameClock++;
      if(gameClock%500 == 0)
        powerups.push(new Powerup(Math.random()*100, Math.random()*100, Powerup.defaultLength, gameClock, Powerup.defaultLifespan))
    }

    //check for key press down, mostly to start movement
    document.addEventListener('keypress', (event) => {
      switch (event.key) {
        case 'w':
          playerBall.moveUp(); break;
        case 'a':
          playerBall.moveLeft(); break;
        case 's':
          playerBall.moveDown(); break;
        case 'd':
          playerBall.moveRight(); break;
        
        //non-movement related
        case 'p':
          level.newBall();
          break;
        case ' ':
          if(power > 0) {
            playerBall.powerUp();
            power--;
          }
          break;
      }
    });

    //check for key press up, used to stop movement
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'w':
          playerBall.stopMoveUp(); break;
        case 'a':
          playerBall.stopMoveLeft(); break;
        case 's':
          playerBall.stopMoveDown(); break;
        case 'd':
          playerBall.stopMoveRight(); break;
      }
    });

    //update the canvas 100fps
    setInterval(() => {draw()}, 10);

  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
}