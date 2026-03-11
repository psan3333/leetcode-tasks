/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    let table = [];
    for (let i = 0; i < s.length; i++) {
        const arr = new Array(s.length).fill(0);
        arr[i] = 1;
        table.push(arr);
    }

    for (let j = 1; j < s.length; j++) {
        for (let i = j - 1; i >= 0; i--) {
            if (s[i] === s[j]) {
                table[i][j] = table[i + 1][j - 1] + 2;
            } else {
                table[i][j] = Math.max(table[i + 1][j], table[i][j - 1]);
            }
        }
        console.log(table);
    }
    return table[0][s.length - 1];
};

const s = "cbbddd";
console.log(longestPalindromeSubseq(s));
