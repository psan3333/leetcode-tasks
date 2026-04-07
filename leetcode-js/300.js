var lengthOfLIS = function (nums) {
    let arr = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
        let maxBefore = 1;
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] < nums[i] && arr[j] + 1 > maxBefore) {
                maxBefore = arr[j] + 1;
            }
            arr[i] = maxBefore;
        }
    }
    return Math.max(...arr);
};