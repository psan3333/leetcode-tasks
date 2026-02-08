var minimumTotal = function (triangle) {
    for (let rowIdx = 1; rowIdx < triangle.length; rowIdx++) {
        for (let index = 0; index < triangle[rowIdx].length; index++) {
            if (triangle[rowIdx].length < 1) break;
            else if (index === 0) triangle[rowIdx][index] += triangle[rowIdx - 1][index];
            else if (index === triangle[rowIdx].length - 1) triangle[rowIdx][index] += triangle[rowIdx - 1][index - 1];
            else if (triangle[rowIdx - 1][index - 1] + triangle[rowIdx][index] < triangle[rowIdx - 1][index] + triangle[rowIdx][index]) {
                triangle[rowIdx][index] += triangle[rowIdx - 1][index - 1];
            }
            else triangle[rowIdx][index] += triangle[rowIdx - 1][index];
        }
    }

    return Math.min(...triangle[triangle.length - 1]);
};

let triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
// let triangle = [[-10]];
console.log(minimumTotal(triangle));