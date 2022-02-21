const POSSIBLE_PATHS = [[0, 1], [0, -1], [1, 0], [-1, 0]];


class Enemy {
    constructor(x, y, map) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.slow = 0,
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

        const possiblePaths = this.getPossiblePaths();
        if (possiblePaths.length > 2) {
            const inverseVel = [-this.vel.x, -this.vel.y];
            [this.vel.x, this.vel.y] = randomPath(possiblePaths.filter(p => !equals(...p, ...inverseVel)));
        }

        while (!this.map.isBlockFree(...this.nextPosition())) {
            [this.vel.x, this.vel.y] = randomVelocity();
        }

        [this.x, this.y] = this.nextPosition();
    }

    getPossiblePaths() {
        return POSSIBLE_PATHS
            .map(p => add(p, [this.x, this.y]))
            .filter(p => this.map.isBlockFree(...p))
            .map((p, index) => POSSIBLE_PATHS[index]);
    }

    render() {
        this.map.setImage(this.x, this.y, "enemy");
    }

    nextPosition() {
        return [this.x + this.vel.x, this.y + this.vel.y];
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}

function randomVelocity() {
    const randomVel = getRandomBool() ? 1 : -1;
    return getRandomBool() ? [0, randomVel] : [randomVel, 0];
}

function randomPath(paths) {
    return paths[getRandomInt(0, paths.length)];
}