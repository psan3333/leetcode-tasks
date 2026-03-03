/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

var minDistance = function (word1, word2) {
    let m = word1.length;
    let n = word2.length;

    let prevArr = new Array(n + 1).fill(0);
    prevArr = prevArr.map((_, idx) => idx);
    let arr = [];
    for (let i = 0; i < m; i++) {
        arr.push(i + 1);
        for (let j = 1; j <= n; j++) {
            if (word1[i] === word2[j - 1]) {
                arr.push(prevArr[j - 1]);
            } else {
                arr.push(1 + Math.min(prevArr[j - 1], prevArr[j], arr[j - 1]));
            }
        }
        prevArr = arr;
        arr = [];
    }
    return prevArr[prevArr.length - 1];
};
