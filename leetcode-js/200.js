/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let islands = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j] = Number(grid[i][j]);
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (!grid[i][j]) continue;

            let queue = [[i, j]];
            let newQueue = [];

            const checkPos = (x, y) => {
                if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
                    return grid[x][y] === 1;
                }
                return false;
            };
            while (queue.length > 0) {
                for (let item of queue) {
                    let [x, y] = item;
                    if (checkPos(x - 1, y)) {
                        newQueue.push([x - 1, y]);
                        grid[x - 1][y] = 0;
                    }
                    if (checkPos(x, y - 1)) {
                        newQueue.push([x, y - 1]);
                        grid[x][y - 1] = 0;
                    }
                    if (checkPos(x + 1, y)) {
                        newQueue.push([x + 1, y]);
                        grid[x + 1][y] = 0;
                    }
                    if (checkPos(x, y + 1)) {
                        newQueue.push([x, y + 1]);
                        grid[x][y + 1] = 0;
                    }
                }
                queue = newQueue;
                newQueue = [];
            }
            islands++;
        }
    }
    return islands;
};
