export class Robot {
    MAX_X = 101;
    // MAX_X = 11;
    MAX_Y = 103;
    // MAX_Y = 7;


    constructor(px, py, vx, vy) {
        this.x = px;
        this.y = py;
        this.vx = vx;
        this.vy = vy;
    }


    move() {
        // console.log('before', this);
        // move and wrap around
        this.x += this.vx;
        this.x = this.x < 0
            ? this.MAX_X + this.x
            : this.x % this.MAX_X;

        this.y += this.vy;
        this.y = this.y < 0
            ? this.MAX_Y + this.y
            : this.y % this.MAX_Y;
        // console.log('after', this);
    }


    getQuadrant() {
        // 1 | 2
        // -----
        // 3 | 4
        // otherwise just return -1
        if (this.x < (this.MAX_X - 1 ) / 2 && this.y < (this.MAX_Y - 1) / 2) return 1;
        else if (this.x > (this.MAX_X - 1) / 2 && this.y < (this.MAX_Y - 1) / 2) return 2;
        else if (this.x < (this.MAX_X - 1) / 2 && this.y > (this.MAX_Y - 1) / 2) return 3;
        else if (this.x > (this.MAX_X - 1) / 2 && this.y > (this.MAX_Y - 1) / 2) return 4;
        else return -1;
    }
}