import Ball from './Components/Ball.js';
import HorizontalLine from './Components/HorziontalLine.js';
import VerticalLine from './Components/VerticalLine.js';
import MovingHorizontalLine from './Components/MovingHorizontalLine.js';
import MovingVerticalLine from './Components/MovingVerticalLine.js';

export default class Level {
    constructor(file) {
        this.data = file;
        this.balls = this.getBalls();
        this.lines = this.getLines();
    }

    //gets all the balls from the level file, which are marked with a 'B'
    getBalls() {
        let balls = [];
        this.data.forEach((item) => {
            if(item[0] == 'B') {
                let line = item.split(' ');
                this.testRandom(line);
                balls.push(new Ball(Number(line[1]), Number(line[2]), Number(line[3]), Number(line[4])));
            }
        });
        this.balls = balls;
        return balls;
    }

    //gets all the liens from the level file, marked with 'H', 'V', 'MH', or 'MV'
    getLines() {
        let lines = [];
        this.data.forEach((item) => {
            if(item[0] == 'L') {
                let line = item.split(' ');
                this.testRandom(line);
                switch(line[1]){
                case 'H':
                    lines.push(new HorizontalLine(Number(line[2]), Number(line[3]), Number(line[4]))); break;
                case 'V':
                    lines.push(new VerticalLine(Number(line[2]), Number(line[3]), Number(line[4]))); break;
                case 'MH':
                    lines.push(new MovingHorizontalLine(Number(line[2]), Number(line[3]), Number(line[4]), Number(line[5]), Number(line[6]))); break;
                case 'MV':
                    lines.push(new MovingVerticalLine(Number(line[2]), Number(line[3]), Number(line[4]), Number(line[5]), Number(line[6]))); break;
                }
            }
        });
        this.lines = lines;
        return lines;
    }

    //adds a new ball to the field
    newBall(x, y, r, s) {
        this.balls.push(new Ball(x, y, r, s));
    }

    //adds a new ball with random traits
    newBall() {
        this.balls.push(new Ball(Math.random()*100, Math.random()*100, Math.random()*Ball.maxRadius+Ball.minRadius, Math.random()*Ball.maxSpeed+Ball.minSpeed));
    }

    //used to convert the letter 'R' to random from level file
    testRandom(items) {
        for(let i = 0; i < items.length; i++)
        if(items[i] == 'R')
            items[i] = Math.random()*100;
        return items;
    }
}