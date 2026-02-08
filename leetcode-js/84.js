/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {

    let stack = [];
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        let currHeight = (i === heights.length) ? 0 : heights[i];
        while (stack.length > 0 && currHeight < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()];
            let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    return maxArea;
};

let heights = [2, 1, 5, 6, 2, 3];
console.log(largestRectangleArea(heights));