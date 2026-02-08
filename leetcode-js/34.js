/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// accepted
function searchLowBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let index = Math.floor((left + right) / 2);

    while (left <= right) {
        if (nums[index] < target) {
            left = index + 1;
        } else {
            right = index - 1;
        }
        index = Math.floor((left + right) / 2);
    }
    return nums[index + 1] === target ? index + 1 : -1;
}

function searchHighBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let index = Math.floor((left + right) / 2);

    while (left <= right) {
        if (nums[index] <= target) {
            left = index + 1;
        } else {
            right = index - 1;
        }
        index = Math.floor((left + right) / 2);
    }
    return nums[index] === target ? index : -1;
}

var searchRange = function (nums, target) {
    return [searchLowBound(nums, target), searchHighBound(nums, target)];
};

let nums = [5, 7, 7, 8, 8, 8, 8, 8, 8, 10],
    target = 8;

console.log(searchRange(nums, target));
