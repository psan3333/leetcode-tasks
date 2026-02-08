var maxFrequencyElements = function (nums) {
    let maxFreq = 1;

    let freqMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (freqMap.has(nums[i])) {
            let freq = freqMap.get(nums[i]);
            freqMap.set(nums[i], freq + 1);
            if (freq + 1 > maxFreq) maxFreq = freq + 1;
        }
        else freqMap.set(nums[i], 1);
    }

    let result = 0;

    for (let num of freqMap.keys()) {
        result += freqMap.get(num) === maxFreq ? maxFreq : 0;
    }

    return result;
};

let nums = [1, 2, 2, 3, 1, 4];
console.log(maxFrequencyElements(nums));