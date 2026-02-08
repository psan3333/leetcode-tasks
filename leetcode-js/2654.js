/**
 * @param {number[]} nums
 * @return {number}
 */

function gcd(num1, num2) {
    while (num1 !== num2) {
        if (num1 > num2) num1 -= num2;
        else if (num1 < num2) num2 -= num1;
    }
    return num1;
}

var minOperations = function (nums) {
    let index = 0;
    let foundGCDEqualOne = false;
    while (index < nums.length - 1) {
        let numsGCD = gcd(nums[index], nums[index + 1]);
        if (numsGCD === 1) {
            foundGCDEqualOne = true;
            break;
        };
        index++;
    }
    if (!foundGCDEqualOne) return -1;

    let result = 0;
    let currIdx = index;
    while (currIdx >= 0) {
        if (!(nums[currIdx] === 1 && nums[currIdx + 1] === 1)) {
            nums[currIdx] = gcd(nums[currIdx], nums[currIdx + 1])
            // console.log(currIdx, nums);
            result++;
        }
        currIdx--;
    }

    currIdx = index + 1;
    while (currIdx < nums.length) {
        if (!(nums[currIdx] === 1 && nums[currIdx - 1] === 1)) {
            nums[currIdx] = gcd(nums[currIdx], nums[currIdx - 1])
            // console.log(currIdx, nums);
            result++;
        }
        currIdx++;
    }
    return result;
};

// let nums = [2, 6, 3, 4];
let nums = [1, 1, 2, 1, 999999, 4, 999999, 1, 2, 999999];
console.log(minOperations(nums));