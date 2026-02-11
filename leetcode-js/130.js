/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

var solve = function (board) {
    let visited = {};

    const isBorder = (pos) => {
        let [y, x] = pos;
        let result =
            y === 0 ||
            y === board.length - 1 ||
            x === 0 ||
            x === board[0].length - 1;
        return result;
    };
    const isVisited = (y, x) => y in visited && visited[y].has(x);
    const setVisited = (y, x) => {
        if (!(y in visited)) {
            visited[y] = new Set();
        }
        visited[y].add(x);
    };
    const checkPos = (y, x) => {
        return (
            y >= 0 &&
            y < board.length &&
            x >= 0 &&
            x < board[0].length &&
            !isVisited(y, x) &&
            board[y][x] === "O"
        );
    };

    const findRegion = (pos) => {
        let [y, x] = pos;
        if (isVisited(y, x)) return;
        setVisited(y, x);
        let borderCnt = 0;
        let visitedPoses = [];
        let queue = [pos];
        let newQueue = [];
        while (queue.length > 0) {
            for (let item of queue) {
                visitedPoses.push(item);
                let [posY, posX] = item;
                if (isBorder(item)) borderCnt++;
                if (checkPos(posY - 1, posX)) {
                    newQueue.push([posY - 1, posX]);
                    setVisited(posY - 1, posX);
                }
                if (checkPos(posY, posX - 1)) {
                    newQueue.push([posY, posX - 1]);
                    setVisited(posY, posX - 1);
                }
                if (checkPos(posY + 1, posX)) {
                    newQueue.push([posY + 1, posX]);
                    setVisited(posY + 1, posX);
                }
                if (checkPos(posY, posX + 1)) {
                    newQueue.push([posY, posX + 1]);
                    setVisited(posY, posX + 1);
                }
            }
            queue = newQueue;
            newQueue = [];
        }
        if (borderCnt === 0) {
            for (let [posY, posX] of visitedPoses) {
                board[posY][posX] = "X";
            }
        }
    };

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (isVisited(i, j)) continue;
            if (board[i][j] === "O") findRegion([i, j]);
            setVisited(i, j);
        }
    }
};

let board = [
    ["O", "X", "O", "X"],
    ["X", "O", "X", "O"],
    ["O", "X", "O", "X"],
    ["X", "O", "X", "O"],
];
solve(board);
console.log(board);
