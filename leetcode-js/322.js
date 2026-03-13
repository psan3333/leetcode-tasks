/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    if (amount === 0) return 0;
    const sums = new Array(amount + 1).fill(Infinity);
    sums[0] = 0;

    for (let coin of coins) {
        for (let i = 0; i <= amount; i++) {
            if (i + coin <= amount) {
                sums[i + coin] = Math.min(sums[i] + 1, sums[i + coin]);
            }
        }
    }

    return sums[amount] !== Infinity ? sums[amount] : -1;
};
