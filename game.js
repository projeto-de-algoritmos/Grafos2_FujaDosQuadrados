const COLORS = ['black', 'lightgray', 'yellow', 'orange', 'red', 'blue', 'purple']
const SLOW_TIME = [2, 5, 10]
const WIDTH = 28;
const HEIGTH = 31;
const TIMEOUT = 150;

function getRandomBool() {
    return getRandomInt(0, 2) === 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

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
                this.slow = this.getSlowTime(colorIndex);
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

        if (!this.isBlockFree(nextBlock)) {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case "ArrowUp":
                    if (this.isBlockFree(nextBlock)) {
                        this.vel.x = -1;
                        this.vel.y = 0;
                    }
                    break;
                case "ArrowDown":
                    if (this.isBlockFree(nextBlock)) {
                        this.vel.x = 1;
                        this.vel.y = 0;
                    }
                    break;
                case "ArrowLeft":
                    if (this.isBlockFree(nextBlock)) {
                        this.vel.x = 0;
                        this.vel.y = -1;
                    }
                    break;
                case "ArrowRight":
                    if (this.isBlockFree(nextBlock)) {
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

    isBlockFree(block) {
        return block > 0;
    }

    getSlowTime(colorIndex) {
        return SLOW_TIME[colorIndex - 2];
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
                this.slow = this.getSlowTime(colorIndex)
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

        while (!this.isBlockFree(nextBlock))
            nextBlock = this.randomEnemyPosition(map);

        this.x += this.vel.x;
        this.y += this.vel.y;
    }

    possiblePaths(map) {
        let paths = 0;

        if (this.isBlockFree(map[this.x + 1][this.y]))
            paths++;
        if (this.isBlockFree(map[this.x - 1][this.y]))
            paths++;
        if (this.isBlockFree(map[this.x][this.y + 1]))
            paths++;
        if (this.isBlockFree(map[this.x][this.y - 1]))
            paths++;

        return paths;
    }

    isBlockFree(block) {
        return block > 0;
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

    getSlowTime(colorIndex) {
        return SLOW_TIME[colorIndex - 2];
    }
}

const inimigos = [
    new Enemy(1, 1, 5),
    new Enemy(1, 26, 5),
    new Enemy(29, 26, 5)
]

const player = new Player(28, 1, 6);

function start() {
    renderMap();
    setInterval(() => {
        updateInimigosList();
        renderMap();
        renderInimigos();
        player.updatePlayer(map);
        renderPlayer(player);
    }, TIMEOUT);
}

function updateInimigosList() {
    inimigos.forEach(j => j.updateEnemy(map))
}

function renderMap() {
    let html = '<table>'
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

function renderPlayer(jogador) {
    window.document.querySelector(`#${getID(jogador.x, jogador.y)}`).style.backgroundColor = COLORS[jogador.color]
}

start()