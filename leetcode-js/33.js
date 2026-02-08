/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let index = Math.floor(nums.length / 2);
    let stepSize = index;

    const getIdx = (idx) => {
        if (idx < 0) return nums.length + idx;
        if (idx >= nums.length) return idx - nums.length;
        return idx;
    };

    const getDist = () => {
        return [
            Math.abs(target - nums[getIdx(index + stepSize)]),
            Math.abs(target - nums[getIdx(index - stepSize)]),
        ];
    };

    while (true) {
        if (nums[index] === target) return index;

        let currIdx = index;
        let dists = getDist();
        if (Math.abs(target - nums[currIdx]) > dists[0]) {
            index = getIdx(currIdx + stepSize);
        }
        if (Math.abs(target - nums[currIdx]) > dists[1]) {
            index = getIdx(currIdx - stepSize);
        }
        if (index === currIdx) {
            stepSize = Math.floor(stepSize / 2);
        }
        if (stepSize === 0) return -1;
    }
};

// let nums = [6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
// let target = 1;
// let nums = [
//     7, 8, 9, 10, 1,
//     2, 3, 4, 5, 6
// ];
let nums = [2, 1];
let target = 1;
console.log(search(nums, target));
// let nums = [];

// for (let i = 1; i <= 100; i++) {
//     nums.push(i);
// }

// let target = 1;
// let resCnt = 0;
// for (let i = 1; i <= 100; i++) {
//     let num = nums.shift();
//     nums.push(num);
//     let res = search(nums, target);
//     console.log(res);
//     console.log("\n");
//     resCnt += nums[res];
// }
// console.log(resCnt);
