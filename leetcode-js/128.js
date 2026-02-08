
function longestConsecutive(nums) {
    let map = new Map();
    let maxLength = 1;

    nums.forEach(value => map.set(value, false));

    for (let num of nums) {
        if (!map.has(num - 1) && !map.get(num)) {
            let sequenceNumber = num;
            let len = 1;
            while (map.has(sequenceNumber + 1)) {
                map.set(sequenceNumber, true);
                sequenceNumber += 1;
                len += 1;
            }
            if (len > maxLength) maxLength = len;
        }
    }

    return maxLength;
}


let nums = [1, 0, 1, 2];
console.log(longestConsecutive(nums));