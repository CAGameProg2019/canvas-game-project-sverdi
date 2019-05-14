class Circle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
    }

    draw (c) {
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.h);
        c.fillStyle = "purple";
        c.fill();
    }

    intersectRect(other) {
      return !(other.x > this.x + this.w ||
               other.x + other.w < this.x ||
               other.y > this.y + this.h ||
               other.y + other.h < this.y);
    }
}
