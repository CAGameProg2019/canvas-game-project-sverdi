class Bullet extends Circle {
    constructor(x, y) {
        super(x, y, 5, 17);

        this.speed = 10;

        this.dead = false;
    }
    draw(c) {
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.h);
        c.fillStyle = "green";
        c.fill();
    }

    update(c) {
        this.y -= this.speed;

        if (this.y < 0)
            this.dead = true;

        this.draw(c);
    }
}
