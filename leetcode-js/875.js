/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */

function totalHours(piles, k) {
    let res = 0;
    for (let i = 0; i < piles.length; i++) {
        res += Math.floor(piles[i] / k) + Math.ceil((piles[i] % k) / piles[i]);
    }
    return res;
}

var minEatingSpeed = function (piles, h) {
    let maxPile = 10 ** 9;
    let minPile = 1;
    let averagePile = Math.floor((maxPile + minPile) / 2);

    while (minPile <= maxPile) {
        currHours = totalHours(piles, averagePile);
        if (currHours > h) minPile = averagePile + 1;
        if (currHours <= h) maxPile = averagePile - 1;
        averagePile = Math.floor((maxPile + minPile) / 2);
    }
    return averagePile + 1;
};

let piles = [3, 7, 10, 8], h = 28;
// let piles = [30, 11, 23, 4, 20], h = 6;
// let piles = [2, 2], h = 2;
console.log(piles, h);
console.log(minEatingSpeed(piles, h));