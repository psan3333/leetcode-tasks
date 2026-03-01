/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    if (nums.length < 3) return Math.max(...nums);

    for (let i = 2; i < nums.length; i++) {
        nums[i] = Math.max(nums[i] + nums[i - 2], nums[i - 1]);
        nums[i - 1] = Math.max(nums[i - 1], nums[i - 2]);
    }
    return nums[nums.length - 1];
};
