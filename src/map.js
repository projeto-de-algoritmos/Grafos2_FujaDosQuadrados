const COLORS = ['#0D0E14', 'lightgray', '#FFEA47', '#FF621F', '#FF2921', '#3D3BD9', '#943BD9', '#52ff6c', 'pink']
const SLOW_TIME = [2, 5, 10]

class Map {
    constructor(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
    }

    isBlockFree(x, y) {
        return this.getBlock(x, y) > 0;
    }

    hasBlockSlow(x, y) {
        return this.getBlock(x, y) > 1;
    }

    isWithinBounds(x, y){
        return x >= 0 && x < this.height && y >= 0 && y < this.width
    }

    render() {
        let html = '<table>'
        for (let row = 0; row < this.height; row++) {
            html += '<tr>'
            for (let column = 0; column < this.width; column++) {
                let color = COLORS[this.getBlock(row, column)];
                html += `<td id="${this.getID(row, column)}" class="celula"style="background-color: ${color}"></td>`
            }
            html += '</tr>'
        }
        window.document.querySelector("#game").innerHTML = html;
    }

    getBlock(x, y) {
        return this.data[x][y];
    }

    getID(x, y) {
        return `block-${x}-${y}`;
    }

    getColor(value) {
        return COLORS[value];
    }

    setColor(x, y, color) {
        const block = window.document.querySelector(`#${this.getID(x, y)}`)
        block.style.backgroundColor = this.getColor(color);
    }

    setImage(x, y, type) {
        let block = window.document.querySelector(`#${this.getID(x, y)}`);

        var image = document.createElement("img");
        image.setAttribute("src", `./src/images/${type}.gif`);

        block.appendChild(image);
    }

    getSlow(x, y) {
        if(map.data[x][y] == 1)
            return 1;
        return SLOW_TIME[this.getBlock(x, y) - 2];
    }

}