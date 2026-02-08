/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let letterTrack = new Map();
    Array.from(t).forEach(letter => letterTrack.set(letter, (letterTrack.get(letter) || 0) + 1));
    let uniqueLetters = Array.from(letterTrack.keys());

    let balanceSum = 0;
    let left = 0;
    let right = 0;

    let maxWindow = "";

    while (right < s.length) {
        while (balanceSum !== uniqueLetters.length && right < s.length) {
            if (letterTrack.has(s[right])) {
                letterTrack.set(s[right], letterTrack.get(s[right]) - 1);
                if (letterTrack.get(s[right]) === 0) {
                    balanceSum += 1;
                    if (balanceSum === uniqueLetters.length) right--;
                }
            }
            right++;
        }

        while (left < right) {
            if (letterTrack.has(s[left])) {
                if (letterTrack.get(s[left]) === 0)
                    break;
                letterTrack.set(s[left], letterTrack.get(s[left]) + 1);
            }
            left++;
        }

        let windowSize = right - left + 1;
        maxWindow = ((windowSize < maxWindow.length || maxWindow === "") && balanceSum === uniqueLetters.length) ? s.slice(left, right + 1) : maxWindow;
        // console.log(s.slice(left, right + 1), maxWindow, windowSize, letterTrack, [left, right], balanceSum);

        letterTrack.set(s[left], letterTrack.get(s[left]) + 1);
        left++;
        balanceSum--;
        while (left < right) {
            if (letterTrack.has(s[left])) {
                break;
            }
            left++;
        }
        right++;
        // console.log(balanceSum, s.slice(left, right + 1));
    }

    return maxWindow;
};

let tests = [
    ["bdab", "ab", "ab"],
    ["a", "a", "a"],
    ["a", "aa", ""],
    ["ADOBECODEBEBANC", "ABC", "BANC"],
    ["aaaaaaaaaaaabbbbbcdd", "abcdd", "abbbbbcdd"],
    ["aaflslflsldkalskaaa", "aaa", "aaa"]
];

let testsCompleted = 0;
for (let idx = 0; idx < tests.length; idx++) {
    let [s, t, res] = tests[idx];
    testsCompleted += minWindow(s, t) === res;
}
console.log(testsCompleted === tests.length);