/**
 * @param {number[]} nums
 * @return {number}
 */
// finds minimum value in sroted array of numbers - can be used with comparison 
var findMin = function (nums) {
    let index = Math.floor(nums.length / 2);
    let stepLength = Math.floor(nums.length / 2);

    const getShiftedIdx = (idx) => {
        return idx < 0 ? nums.length + idx : idx;
    }

    while (stepLength > 0) {
        let currIdx = index;
        // console.log(index, stepLength, (currIdx - stepLength) % nums.length);
        if (nums[getShiftedIdx(currIdx - stepLength)] < nums[currIdx]) {
            index = getShiftedIdx(currIdx - stepLength);
        }
        if (nums[(currIdx + stepLength) % nums.length] < nums[currIdx]) {
            index = (currIdx + stepLength) % nums.length;
        }
        if (currIdx !== index) {
            continue;
        }
        stepLength = Math.floor(stepLength / 2);
    }
    return nums[index];
};

let nums = [];
// let nums = [3, 4, 5, 1, 2];
// let nums = [10, 1];
// let nums = [15];
// let nums = [2, 3, 4, 5, 6, 1];
// console.log(findMin(nums));

for (let i = 1; i <= 1000; i++) {
    nums.push(i);
}

let resCnt = 0;
for (let i = 1; i <= 100; i++) {
    let num = nums.shift();
    nums.push(num);
    res = findMin(nums);
    resCnt += res;
    console.log(res);
}
console.log(resCnt, nums.length);