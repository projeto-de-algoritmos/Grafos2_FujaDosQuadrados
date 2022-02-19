class Player {

    constructor(x, y, map) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.slow = 0;
        this.vel = {
            x: 1,
            y: 0
        }
    }

    update() {
        this.readKeys();

        if (!this.map.isBlockFree(...this.nextPosition())) {
            return;
        }

        this.x += this.vel.x;
        this.y += this.vel.y;
    }

    render() {
        this.map.setImage(this.x, this.y, "player");
    }

    nextPosition() {
        return [this.x + this.vel.x, this.y + this.vel.y];
    }

    readKeys() {
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case "ArrowUp":
                    this.vel.x = -1;
                    this.vel.y = 0;
                    break;
                case "ArrowDown":
                    this.vel.x = 1;
                    this.vel.y = 0;
                    break;
                case "ArrowLeft":
                    this.vel.x = 0;
                    this.vel.y = -1;
                    break;
                case "ArrowRight":
                    this.vel.x = 0;
                    this.vel.y = 1;
                    break;
            }
        }, false);
    }
}