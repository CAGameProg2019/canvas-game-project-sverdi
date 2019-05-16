let canvas = document.getElementById('main');
let c = canvas.getContext('2d');
let keys = {};

var player = new Circle(50,550, 75, 50);
var bullets = [];
var arrEnemies1 = [];
var arrEnemies2 = [];

var xSpeed = 5;
var cooldown_secs = 500;
var lastShotFired_time = 0;

function init() {
    for (let i = 0; i < 10; i++){
        arrEnemies1.push(new Enemies(i * 95, 100, 5));
        arrEnemies2.push(new Enemies(canvas.width-i * 95 , 200, -5));
    }
    update();
}


function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (keys['d']) {
        player.x += xSpeed;
    }

    if (keys['a']) {
        player.x -= xSpeed;
    }

    // shooting
    if (keys['e']) {
        shoot();
    }

    if (arrEnemies1.length > 0 && (arrEnemies1[arrEnemies1.length-1].x > canvas.width || arrEnemies1[0].x < 0)) {
        for (let i = 0; i < arrEnemies1.length ; i++){
            arrEnemies1[i].speed *= -1;
        }
    }

    if (arrEnemies2.length > 0 && (arrEnemies2[0].x > canvas.width || arrEnemies2[arrEnemies2.length-1].x < 0)) {
        for (let i = 0; i < arrEnemies2.length ; i++){
            arrEnemies2[i].speed *= -1;
        }
    }

    for (let i = 0; i < arrEnemies1.length; i++){
        arrEnemies1[i].update(c);
    }

    for (let i = 0; i < arrEnemies2.length; i++){
        arrEnemies2[i].update(c);
    }

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update(c);

        for (let j = 0; j < arrEnemies1.length; j++){

            if (bullets[i].intersectRect(arrEnemies1[j])) {
                bullets[i].dead = true;
                arrEnemies1[j].dead = true;
            }

        }

        for (let j = 0; j < arrEnemies2.length; j++){

            if (bullets[i].intersectRect(arrEnemies2[j])) {
                bullets[i].dead = true;
                arrEnemies2[j].dead = true;
            }

        }
    }

    bullets = bullets.filter(function(b) {
        return !b.dead;
    });

    arrEnemies1 = arrEnemies1.filter(function(e) {
        return !e.dead;
    });

    arrEnemies2 = arrEnemies2.filter(function(e) {
        return !e.dead;
    });

    if (arrEnemies1.length == 0 && arrEnemies2.length == 0) {
        alert("You win!");
        return;
    }

    player.draw(c);
    requestAnimationFrame(update);
}

function shoot() {
    if ((new Date).getTime() - lastShotFired_time >= cooldown_secs) {

        bullets.push( new Bullet(player.x + player.w/2 - 5, player.y) );

        lastShotFired_time = (new Date).getTime();
    }
}


window.addEventListener('load', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

    window.addEventListener('keydown', e => {
        keys[e.key] = true;
    })

    window.addEventListener('keyup', e => {
        keys[e.key] = false;
    })
});
