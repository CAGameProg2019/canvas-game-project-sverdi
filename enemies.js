class Enemies extends Circle {
    constructor(x, y, speed){
        super(x, y, 50, 25);
        this.speed = speed;

        this.dead = false;
    }
    update(c) {
        this.x += this.speed;

        this.draw(c);
    }
    draw(c) {
        c.fillStyle = "red";
        c.beginPath();
        c.fillRect(this.x, this.y, this.w, this.h);
        c.fill();
        c.stroke();
    }
}
