/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let red = 0,
        white = 0,
        blue = 0;

    for (let num of nums) {
        red += num === 0;
        white += num === 1;
        blue += num === 2;
    }

    for (let i = 0; i < red; i++) {
        nums[i] = 0;
    }
    for (let i = red; i < red + white; i++) {
        nums[i] = 1;
    }
    for (let i = red + white; i < nums.length; i++) {
        nums[i] = 2;
    }
};

nums = [
    2, 2, 1, 2, 1, 1, 1, 0, 0, 2, 1, 0, 2, 1, 2, 2, 1, 1, 1, 1, 1, 0, 2, 0, 2,
    0, 2, 2, 1, 0, 2, 1, 0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 1, 2, 0, 1, 2, 2, 0, 0,
    2, 2, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 2, 2, 2, 1, 0, 0, 2, 1, 0, 1, 0, 2,
    2, 1, 2, 1, 1, 2, 1, 1, 0, 0, 2, 1, 0, 0,
];
sortColors(nums);
console.log(nums);
