/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    let pacificBoard = new Array(heights.length).fill(null);
    let atlanticBoard = new Array(heights.length).fill(null);
    for (let i = 0; i < heights.length; i++) {
        pacificBoard[i] = new Array(heights[0].length).fill(false);
        atlanticBoard[i] = new Array(heights[0].length).fill(false);
    }

    const checkPos = (y, x, posY, posX, board) => {
        return (
            posY >= 0 &&
            posX >= 0 &&
            posY < heights.length &&
            posX < heights[0].length &&
            !board[posY][posX] &&
            heights[posY][posX] >= heights[y][x]
        );
    };

    const bfs = (queue, board) => {
        let newQueue = [];
        while (queue.length > 0) {
            for (let [y, x] of queue) {
                board[y][x] = true;
                let coords = [];
                for (let i = -1; i <= 1; i++) {
                    coords.push([y, x + i], [y + i, x]);
                }
                for (let coord of coords) {
                    if (checkPos(y, x, coord[0], coord[1], board)) {
                        newQueue.push(coord);
                        board[coord[0]][coord[1]] = true;
                    }
                }
            }
            queue = newQueue;
            newQueue = [];
        }
    };

    let queue = [];
    for (let i = 0; i < heights.length; i++) {
        queue.push([i, 0]);
    }
    for (let i = 0; i < heights[0].length; i++) {
        queue.push([0, i]);
    }
    bfs(queue, pacificBoard);
    queue = [];
    for (let i = 0; i < heights.length; i++) {
        queue.push([i, heights[0].length - 1]);
    }
    for (let i = 0; i < heights[0].length; i++) {
        queue.push([heights.length - 1, i]);
    }
    bfs(queue, atlanticBoard);

    let result = [];
    for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[0].length; j++) {
            if (atlanticBoard[i][j] && pacificBoard[i][j]) result.push([i, j]);
        }
    }
    return result;
};

let heights = [[1]];
console.log(pacificAtlantic(heights));
