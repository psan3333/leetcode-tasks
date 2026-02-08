/**
 * @param {string} s
 * @return {number}
 */
// Brute force solution - accepted though (check every substring of this string)
var countSubstringsSlow = function (s) {
    let result = s.length;

    let windowLength = s.length;

    while (windowLength >= 2) {
        for (let i = 0; i <= s.length - windowLength; i++) {
            let left = i,
                right = i + windowLength - 1;

            while (left < right) {
                if (s[left] != s[right]) {
                    break;
                }
                left++;
                right--;
            }
            if (left >= right) {
                result++;
            }
        }
        windowLength--;
    }
    return result;
};

// Optimal Solution - solved by me
var countSubstrings = function (s) {
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        let left = i,
            right = i;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            result++;
            right++;
            left--;
        }

        left = i;
        right = i + 1;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            result++;
            right++;
            left--;
        }
    }
    return result;
};

let s = "aaa";
console.log(countSubstrings(s));
