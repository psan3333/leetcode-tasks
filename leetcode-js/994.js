/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    let queue = [];
    let hasOranges = false;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (!!grid[i][j]) hasOranges = true;
            if (grid[i][j] === 2) queue.push([i, j]);
        }
    }
    if (!hasOranges) return 0;
    if (queue.length === 0) return -1;

    const checkCoords = (y, x) => {
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
            return grid[y][x] === 1;
        }
        return false;
    };

    let newQueue = [];
    let elapsedTime = 0;
    while (true) {
        for (let [y, x] of queue) {
            if (checkCoords(y - 1, x)) {
                grid[y - 1][x] = 0;
                newQueue.push([y - 1, x]);
            }
            if (checkCoords(y, x - 1)) {
                grid[y][x - 1] = 0;
                newQueue.push([y, x - 1]);
            }
            if (checkCoords(y + 1, x)) {
                grid[y + 1][x] = 0;
                newQueue.push([y + 1, x]);
            }
            if (checkCoords(y, x + 1)) {
                grid[y][x + 1] = 0;
                newQueue.push([y, x + 1]);
            }
        }

        if (newQueue.length === 0) break;
        elapsedTime++;
        queue = newQueue;
        newQueue = [];
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) return -1;
        }
    }

    return elapsedTime;
};
