import VerticalLine from './VerticalLine.js';
import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

export default class MovingVerticalLine extends VerticalLine {
    constructor(x, y, length, dx, dy) {
        super(x, y, length)
        this.dx = percentWidth(dx);
        this.dy = percentHeight(dy);
    }

    draw(ctx) {
        this.move();
        super.draw(ctx);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        if(this.x <= 0 || this.x >= percentWidth(100))
            this.dx = -this.dx;
        if(this.y <= 0 || this.y + this.length >= percentHeight(100))
            this.dy = -this.dy;   
    }
}