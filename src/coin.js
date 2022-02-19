
class Coin {

    constructor(x, y, map) {
        this.map = map;
        this.x = x;
        this.y = y;
    }

    updatePosition() {
        [this.x, this.y] = this.randomPosition();

        while (!this.map.isBlockFree(this.x, this.y)) {
            [this.x, this.y] = this.randomPosition();
        }
    }

    randomPosition() {
        const x = getRandomInt(0, this.map.height);
        const y = getRandomInt(0, this.map.width);
        return [x, y];
    }

    render() {
        this.map.setImage(this.x, this.y, "coin");
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}