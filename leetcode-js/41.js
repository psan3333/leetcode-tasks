/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    let currIdx = 0;
    nums.push(nums[0]);

    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i] < 0 ? 0 : nums[i];
    }

    for (let num of nums) {
        let nextNum = num;
        while (nextNum < nums.length && nums[nextNum] >= 0) {
            let temp = nextNum;
            nextNum = nums[nextNum];
            nums[temp] = -1;
        }
    }

    let result = 1;
    while (result - 1 < nums.length && nums[result] < 0) {
        result++;
    }
    return result;
};
