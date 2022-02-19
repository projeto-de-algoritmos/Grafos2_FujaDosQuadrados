const COLORS = ['#0D0E14', 'lightgray', '#FFEA47', '#FF621F', '#FF2921', '#3D3BD9', '#943BD9', '#52ff6c']
const SLOW_TIME = [2, 5, 10]
const WIDTH = 28;
const HEIGTH = 31;
const TIMEOUT = 200;

class Player {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.slow = 0;
        this.color = color;
        this.vel = { x, y }
        this.vel.x = 1;
        this.vel.y = 0;
    }

    updatePlayer(map) {
        const colorIndex = map[this.x][this.y]

        if (colorIndex > 1) {
            if (this.slow === 0) {
                this.slow = getSlowTime(colorIndex);
                return;
            } else {
                this.slow--;
                if (this.slow > 0)
                    return;
            }
        }

        let y = this.y + this.vel.y;
        let x = this.x + this.vel.x;
        let nextBlock = map[x][y];

        if (!isBlockFree(nextBlock)) {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case "ArrowUp":
                    if (isBlockFree(nextBlock)) {
                        this.vel.x = -1;
                        this.vel.y = 0;
                    }
                    break;
                case "ArrowDown":
                    if (isBlockFree(nextBlock)) {
                        this.vel.x = 1;
                        this.vel.y = 0;
                    }
                    break;
                case "ArrowLeft":
                    if (isBlockFree(nextBlock)) {
                        this.vel.x = 0;
                        this.vel.y = -1;
                    }
                    break;
                case "ArrowRight":
                    if (isBlockFree(nextBlock)) {
                        this.vel.x = 0;
                        this.vel.y = 1;
                    }
                    break;
                default:
                    break;
            }
        }, false);

        this.x += this.vel.x;
        this.y += this.vel.y;
    }
}

class Enemy {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.slow = 0;
        this.color = color;
        this.vel = { x, y }
        this.vel.x = 1;
        this.vel.y = 0;
    }

    updateEnemy(map) {
        const colorIndex = map[this.x][this.y]

        if (colorIndex > 1) {
            if (this.slow === 0) {
                this.slow = getSlowTime(colorIndex)
                return;
            } else {
                this.slow--;
                if (this.slow > 0)
                    return;
            }
        }

        let y = this.y + this.vel.y
        let x = this.x + this.vel.x
        let nextBlock = map[x][y];

        if (this.possiblePaths(map) > 2)
            nextBlock = this.randomEnemyPosition(map);

        while (!isBlockFree(nextBlock))
            nextBlock = this.randomEnemyPosition(map);

        this.x += this.vel.x;
        this.y += this.vel.y;
    }

    possiblePaths(map) {
        let paths = 0;

        if (isBlockFree(map[this.x + 1][this.y]))
            paths++;
        if (isBlockFree(map[this.x - 1][this.y]))
            paths++;
        if (isBlockFree(map[this.x][this.y + 1]))
            paths++;
        if (isBlockFree(map[this.x][this.y - 1]))
            paths++;

        return paths;
    }

    randomEnemyPosition(map) {
        if (getRandomBool()) {
            this.vel.x = getRandomBool() ? 1 : -1;
            this.vel.y = 0;
        } else {
            this.vel.x = 0;
            this.vel.y = getRandomBool() ? 1 : -1;
        }

        const y = this.y + this.vel.y;
        const x = this.x + this.vel.x;
        return map[x][y];
    }
}

class Coin {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    updatePosition() {
        let x = getRandomInt(0, 31);
        let y = getRandomInt(0, 31);
        let nextBlock = map[x][y];

        while (!isBlockFree(nextBlock)) {
            x = getRandomInt(0, 31);
            y = getRandomInt(0, 31);
            nextBlock = map[x][y];
        }

        this.x = x;
        this.y = y;
    }
}

const inimigos = [
    new Enemy(1, 1, 5),
    new Enemy(1, 26, 5),
    new Enemy(29, 26, 5),
    new Enemy(28, 1, 5)
]

const player = new Player(14, 15, 6);

const coin = new Coin(11, 10, 7);

let score = 0;

function start() {
    renderMap();
    const gameUpdate = setInterval(() => {
        updateInimigosList();
        player.updatePlayer(map);

        renderMap();
        renderBlock(coin);
        renderInimigos();
        renderBlock(player);

        isCoinAdquired();

        if (isGameOver())
            clearInterval(gameUpdate);

    }, TIMEOUT);
}

function getRandomBool() {
    return getRandomInt(0, 2) === 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function isBlockFree(block) {
    return block > 0;
}

function getSlowTime(colorIndex) {
    return SLOW_TIME[colorIndex - 2];
}

function updateInimigosList() {
    inimigos.forEach(j => j.updateEnemy(map))
}

function isGameOver() {
    for (let index = 0; index < inimigos.length; index++)
        if (hasCollided(inimigos[index], player))
            return true;

    return false;
}

function isCoinAdquired() {
    if (hasCollided(coin, player)) {
        coin.updatePosition();
        score++;
        console.log(score);
    }
}

function hasCollided(block1, block2) {
    if (block1.x === block2.x && block1.y === block2.y)
        return true;
    return false;
}

function renderMap() {
    let scoreDisplay = '<h1>' + "Score: " + score + '</h1>';
    let html = scoreDisplay;

    html += '<table>';
    for (let row = 0; row < HEIGTH; row++) {
        html += '<tr>'
        for (let column = 0; column < WIDTH; column++) {
            let color = COLORS[map[row][column]];
            html += `<td id="${getID(row, column)}" class="celula"style="background-color: ${color}"></td>`
        }
        html += '</tr>'
    }

    window.document.querySelector("#game").innerHTML = html;
}

function getID(x, y) {
    return `block-${x}-${y}`
}

function renderInimigos() {
    inimigos.forEach(j => {
        window.document.querySelector(`#${getID(j.x, j.y)}`).style.backgroundColor = COLORS[j.color]
    })
}

function renderBlock(block) {
    window.document.querySelector(`#${getID(block.x, block.y)}`).style.backgroundColor = COLORS[block.color]
}

start()