/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let majority = 0;
    let res = nums[0];
    for (let num of nums) {
        if (majority === 0) {
            res = num;
        }
        majority += num === res ? 1 : -1;
    }
    return res;
};
