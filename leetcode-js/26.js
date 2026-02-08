/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let currIdx = 0;
    let currNum = nums[0];
    for (let num of nums) {
        if (num != currNum) {
            currNum = num;
            currIdx++;
            nums[currIdx] = num;
        }
    }
    return currIdx + 1;
};

const nums = [1, 1, 1, 1, 2, 2, 2, 2, 3, 4, 4, 5, 5, 6, 6];
console.log(removeDuplicates(nums));
