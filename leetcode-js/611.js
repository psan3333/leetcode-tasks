function isTriangle(nums) {
    return nums[0] + nums[1] > nums[2] && nums[0] + nums[2] > nums[1] && nums[1] + nums[2] > nums[0];
}

function binSearch(nums, num) {
    let left = 0,
        right = nums.length - 1;

    let index = Math.floor((left + right) / 2);

    while (left <= right) {
        if (nums[index] === num) return index;
        if (nums[index] > num) right = index - 1;
        if (nums[index] < num) left = index + 1;

        index = Math.floor((left + right) / 2);
    }

    return index;
}

function triangleNumber(nums) {
    // what to do: find such triplets that each two element of the triplet
    // have bigger sum than the last triplet


    nums = nums.sort();
    let resultCnt = 0;

    let cntBefore = 0;
    let countMap = new Map();
    nums.forEach(num => {
        cntBefore++;
        if (countMap.has(num)) {
            let mapElem = countMap.get(num);
            countMap.set(num, [mapElem[0] + 1, cntBefore]);
        }
        else countMap.set(num, [1, cntBefore]);
    });

    nums = Array.from(new Set(nums)).sort();

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let minEdge = Math.min(nums[i], nums[j]);
            let maxEdge = Math.max(nums[i], nums[j]);

            let minFitEdge = Math.max(maxEdge - minEdge + 1, nums[0]);
            let maxFitEdge = Math.min(maxEdge + minEdge - 1, nums[nums.length - 1]);

            let cntMapMin = countMap.get(nums[binSearch(nums, minFitEdge)]);
            let cntMapMax = countMap.get(nums[binSearch(nums, maxFitEdge)]);
            resultCnt += cntMapMax[1] - cntMapMin[1];
            console.log(nums[i], nums[j], cntMapMax, cntMapMin);
        }
    }

    return resultCnt;
}

let nums = [2, 2, 3, 4];
// let nums = [4, 2, 3, 4];
// [2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
console.log(triangleNumber(nums));
