/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    let grid = new Array(text1.length);
    for (let i = 0; i < text1.length; i++) {
        grid[i] = new Array(text2.length).fill(0);
    }

    const getByIdx = (i, j) => {
        if (i >= 0 && j >= 0) return grid[i][j];
        return 0;
    };

    for (let i = 0; i < text1.length; i++) {
        for (let j = 0; j < text2.length; j++) {
            if (text1[i] === text2[j]) {
                grid[i][j] = getByIdx(i - 1, j - 1) + 1;
            } else {
                grid[i][j] = Math.max(getByIdx(i - 1, j), getByIdx(i, j - 1));
            }
        }
    }
    return grid[text1.length - 1][text2.length - 1];
};

console.log(longestCommonSubsequence("carma", "marc"));
