/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    if (s1.length > s2.length) return false;

    let balanceMap = new Map();
    Array.from(s1).forEach(char => balanceMap.set(char, (balanceMap.get(char) || 0) + 1));
    let uniqueLettersCnt = Array.from(balanceMap.keys()).length;

    let left = 0;
    let right = s1.length - 1;
    let balanceSum = 0;
    Array.from(s1).forEach((_, idx) => {
        if (balanceMap.has(s2[idx])) {
            balanceMap.set(s2[idx], balanceMap.get(s2[idx]) - 1);
            if (balanceMap.get(s2[idx]) === 0) {
                balanceSum += 1;
            }
        }
    });
    // console.log(balanceSum, balanceMap);

    while (right < s2.length - 1 && balanceSum !== uniqueLettersCnt) {
        left++;
        right++;
        if (balanceMap.has(s2[left - 1])) {
            if (balanceMap.get(s2[left - 1]) === 0) {
                balanceSum -= 1;
            }
            balanceMap.set(s2[left - 1], balanceMap.get(s2[left - 1]) + 1);
        }

        if (balanceMap.has(s2[right])) {
            balanceMap.set(s2[right], balanceMap.get(s2[right]) - 1);
            if (balanceMap.get(s2[right]) === 0) {
                balanceSum += 1;
            }
        }
        // console.log(balanceMap, balanceSum, s2.slice(left, right + 1), left, right);
    }

    return balanceSum === uniqueLettersCnt;
};

let s1 = "adc";
let s2 = "dcda";
console.log(checkInclusion(s1, s2));