/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let commorPrefix = strs[0];
    let maxIdx = strs[0].length;

    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        while (j < maxIdx && j < commorPrefix.length && j < strs[i].length) {
            if (strs[i][j] != commorPrefix[j]) {
                maxIdx = j;
                break;
            }
            j++;
        }
        if (maxIdx > strs[i].length && j >= strs[i].length) {
            maxIdx = j;
        }
    }
    return commorPrefix.slice(0, maxIdx);
};

let strs = ["flow", "flower"];
console.log(longestCommonPrefix(strs));
