function twoSum(nums, target) {
    let numsMap = new Map();

    nums.reduce((acc, num, index) => acc.set(target - num, index), numsMap);

    for (let i = 0; i < nums.length; i++) {
        let index = numsMap.get(nums[i]);
        if (numsMap.has(nums[i]) && index !== i) {
            return [i, index];
        }
    }

    return [];
}

let arr = [2, 1, 54, 45, 213, 346, 2, 4, 654];

console.log(twoSum(arr, 1000));