
class Coin {

    constructor(x, y, color, map) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    updatePosition() {
        [this.x, this.y] = this.randomPosition();
        
        while (!this.map.isBlockFree(this.x, this.y)) {
            [this.x, this.y] = this.randomPosition();
        }
    }

    randomPosition(){
        const x = getRandomInt(0, this.map.height);
        const y = getRandomInt(0, this.map.width);
        return [x, y];
    }

    render() {
        this.map.setColor(this.x, this.y, this.color);
    }

    collide(obj){
        return hasCollided(this, obj);
    }
}