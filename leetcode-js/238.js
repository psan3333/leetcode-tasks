function productExceptSelf(nums) {
    let res = [1];

    for (let i = 1; i < nums.length; i++) {
        res.push(res[i - 1] * nums[i - 1]);
    }

    let acc = 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        res[i] *= acc * nums[i + 1];
        acc *= nums[i + 1];
    }

    return res;
}

let nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums));

