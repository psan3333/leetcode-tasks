/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
    let dp = new Array(arr.length + 1).fill(0);

    for (let i = 1; i <= arr.length; i++) {
        let currMax = 0;
        for (let j = 1; j <= Math.min(i, k); j++) {
            currMax = Math.max(currMax, arr[i - j]);
            dp[i] = Math.max(dp[i], dp[i - j] + currMax * j);
        }
    }
    return dp[arr.length];
};

let arr = [1, 15, 7, 9, 2, 5, 10],
    k = 3;

console.log(maxSumAfterPartitioning(arr, k));
