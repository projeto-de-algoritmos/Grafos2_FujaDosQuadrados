
const TIMEOUT = 200;

const WIDTH = 28;
const HEIGTH = 31;
const map = new Map(MAP_DATA, WIDTH, HEIGTH);

const enemies = [
    new Enemy(1, 1, map),
    new Enemy(1, 26, map),
    new Enemy(29, 26, map),
    new Enemy(29, 1, map),
]

function start() {
    map.render();
    setInterval(() => {
        update();
        render();
    }, TIMEOUT);
}

function update(){
    enemies.forEach(j => j.update());
}

function render(){
    map.render();
    enemies.forEach(j => j.render());
}

start()