
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
