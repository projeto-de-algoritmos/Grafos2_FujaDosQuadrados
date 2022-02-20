
function getRandomBool() {
    return getRandomInt(0, 2) === 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function hasCollided(obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y;
}

function add(p1, p2){
    return [p1[0] + p2[0], p1[1] + p2[1]]
}

function equals(x1, y1, x2, y2){
    return x1 === x2 && y1 === y2;
}