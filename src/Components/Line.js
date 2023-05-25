import percentWidth from './percentWidth.js';
import percentHeight from './percentHeight.js';

export default class Line {
    constructor(x, y, length) {
        this.x = percentWidth(x);
        this.y = percentHeight(y);
        this.length = percentWidth(length);
    }

    update(ctx) {
        this.draw(ctx);
    }
}