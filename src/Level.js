import Ball from './Components/Ball.js';
import HorizontalLine from './Components/HorziontalLine.js';
import VerticalLine from './Components/VerticalLine.js';

class Level {
    constructor(file) {
        this.data = file;
        this.balls = this.getBalls();
        this.lines = this.getLines();
    }

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

    getLines() {
        let lines = [];
        this.data.forEach((item) => {
            if(item[0] == 'L') {
                let line = item.split(' ');
                this.testRandom(line);
                if(line[1] == 'H')
                    lines.push(new HorizontalLine(Number(line[2]), Number(line[3]), Number(line[4])));
                if(line[1] == 'V')
                    lines.push(new VerticalLine(Number(line[2]), Number(line[3]), Number(line[4])));
            }
        });
        this.lines = lines;
        return lines;
    }

    newBall(x, y, r, s) {
        this.balls.push(new Ball(x, y, r, s));
    }

    newBall() {
        this.balls.push(new Ball(Math.random()*100, Math.random()*100, Math.random()*Ball.maxRadius+Ball.minRadius, Math.random()*Ball.maxSpeed+Ball.minSpeed));
    }

    testRandom(items) {
        for(let i = 0; i < items.length; i++)
        if(items[i] == 'R')
            items[i] = Math.random()*100;
        return items;
    }
}

export default Level;   