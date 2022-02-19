
class Enemy{
    constructor(x, y, map){
        this.x = x;
        this.y = y;
        this.map = map;
        this.slow = 0,
        this.color = 5,
        this.vel = {
            x: 1,
            y: 0,
        }
    }

    update() {
        if (this.map.hasBlockSlow(this.x, this.y)) {
            if (this.slow === 0) {
                this.slow = this.map.getSlow(this.x, this.y);
                return;
            } else {
                this.slow--;
                if (this.slow > 0)
                    return;
            }
        }
        if (this.countPossiblePaths() > 2){
            [this.vel.x, this.vel.y] = randomVelocity();
        }
    
        while (!map.isBlockFree(...this.nextPosition())){
            [this.vel.x, this.vel.y] = randomVelocity();
        }
    
        [this.x, this.y] = this.nextPosition();
    }

    countPossiblePaths() {
        let paths = 0;
        if (this.map.isBlockFree(this.x + 1, this.y))
        paths++;
        if (this.map.isBlockFree(this.x - 1, this.y))
        paths++;
        if (this.map.isBlockFree(this.x, this.y + 1))
        paths++;
        if (this.map.isBlockFree(this.x, this.y - 1))
        paths++;
        
        return paths;
    }

    render(){
        this.map.setColor(this.x, this.y, this.color);
    }

    nextPosition(){
        return [this.x + this.vel.x, this.y + this.vel.y];
    }    
}

function randomVelocity() {
    const randomVel = getRandomBool() ? 1 : -1;
    return getRandomBool() ? [0, randomVel] : [randomVel, 0];
}