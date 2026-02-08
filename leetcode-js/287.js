/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicateMy = function (nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num > nums.length) {
            num -= nums.length;
        }
        if (nums[num] > nums.length) {
            result = num;
            break;
        }
        else {
            nums[num] += nums.length;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > nums.length) {
            nums[i] -= nums.length;
        }
    }
    return result;
};

var findDuplicate = function (nums) {
    let slow = nums[0];
    let fast = nums[nums[0]];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    slow = 0;
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

let nums = [1, 3, 4, 2, 2];
console.log(findDuplicate(nums));