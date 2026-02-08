/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
    let fleets = [];
    fleets.length = position.length;
    fleets.fill(0);
    fleets = fleets.map((_, idx) => {
        return {
            pos: position[idx],
            speed: speed[idx],
            timeToEnd: (target - position[idx]) / speed[idx],
        };
    });

    fleets = fleets.sort((a, b) => b.pos - a.pos);

    let currFleet = fleets[0];
    let fleetCnt = 1;
    for (let i = 1; i < fleets.length; i++) {
        if (currFleet.timeToEnd < fleets[i].timeToEnd) {
            fleetCnt++;
            currFleet = fleets[i];
        }
    }

    return fleetCnt;
};

// let target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3];
// let target = 10, position = [0, 4, 2], speed = [2, 1, 3];
let target = 13,
    position = [10, 2, 5, 7, 4, 6, 11],
    speed = [7, 5, 10, 5, 9, 4, 1];
console.log(carFleet(target, position, speed));
