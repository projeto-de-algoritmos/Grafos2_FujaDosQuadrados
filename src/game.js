
const TIMEOUT = 2000;

let score = 0;
let gameUpdate;

const map = new Map(MAP_DATA, WIDTH, HEIGTH);

const player = new Player(10, 14, 6, map);

const coin = new Coin(11, 10, 7, map);

const inteligentEnemy = new InteligentEnemy(14, 14, map);

const enemies = [
    new Enemy(1, 1, map),
    new Enemy(1, 26, map),
    new Enemy(29, 26, map),
    
]

function start() {
    map.render();
    gameUpdate = setInterval(() => {
        update();        
        render();
    }, TIMEOUT);
}

function update(){
    enemies.forEach(j => j.update());
    player.update();
    inteligentEnemy.update(player);

    if(coin.collide(player)){
        coin.updatePosition();
        score++;
    }

    // if(isGameOver()){
    //     endGame();
    // }
}

function render(){
    renderScore();
    map.render();
    coin.render();
    player.render();
    enemies.forEach(j => j.render());
    inteligentEnemy.render()
}

function endGame(){
    console.log("Perdeu!")
    clearInterval(gameUpdate);
}

function isGameOver(){
    return enemies.find(e => e.collide(player));
}

function renderScore(){
    window.document.querySelector("#score").innerHTML = score;
}

start()