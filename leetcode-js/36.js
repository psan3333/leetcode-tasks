function isValidSudoku(board) {
    for (let crossIndex = 0; crossIndex < 9; crossIndex++) {
        let validCol = new Set();
        let validRow = new Set();
        for (let col = 0; col < 9; col++) {
            if (validCol.has(board[crossIndex][col])) return false;
            if (board[crossIndex][col] !== ".") {
                validCol.add(board[crossIndex][col]);
            }

            if (validRow.has(board[col][crossIndex])) return false;
            if (board[col][crossIndex] !== ".") {
                validRow.add(board[col][crossIndex]);
            }
        }
    }

    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
            let repeatingNums = new Set();
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    let boardNum = board[boxRow + row][boxCol + col];
                    if (repeatingNums.has(boardNum)) return false;
                    if (boardNum !== "." && !repeatingNums.has(boardNum)) {
                        repeatingNums.add(boardNum);
                    }
                }
            }
        }
    }

    return true;
}

let board = [["8", "3", ".", ".", "7", ".", ".", ".", "."]
    , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
    , [".", "9", "8", ".", ".", ".", ".", "6", "."]
    , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
    , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
    , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
    , [".", "6", ".", ".", ".", ".", "2", "8", "."]
    , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
    , [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

console.log(isValidSudoku(board));