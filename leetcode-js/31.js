function reverseArrayPart(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

var nextPermutation = function (nums) {
    if (nums.length === 0) {
        return;
    }

    let index = nums.length - 2;
    while (index >= 0 && nums[index] >= nums[index + 1]) {
        index--;
    }
    if (index < 0) {
        reverseArrayPart(nums, 0, nums.length - 1);
    } else {
        let firstHigher = nums.length - 1;
        while (nums[index] >= nums[firstHigher] && firstHigher > index) {
            firstHigher--;
        }
        [nums[index], nums[firstHigher]] = [nums[firstHigher], nums[index]];
        reverseArrayPart(nums, index + 1, nums.length - 1);
    }
};

let nums = [5, 1, 1];
nextPermutation(nums);
console.log(nums);
