/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let left = 0;
    let right = matrix.length * matrix[0].length - 1;
    let index = Math.floor((left + right) / 2);

    const flatIdxToMat = (idx) => [Math.floor(idx / matrix[0].length), idx % matrix[0].length];

    while (left <= right) {
        let indexMat = flatIdxToMat(index);
        if (matrix[indexMat[0]][indexMat[1]] === target) return true;
        if (matrix[indexMat[0]][indexMat[1]] < target) left = index + 1;
        if (matrix[indexMat[0]][indexMat[1]] > target) right = index - 1;
        index = Math.floor((left + right) / 2);
    }
    return false;
};

// let matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 4;
let matrix = [[1]], target = 2;
console.log(searchMatrix(matrix, target));