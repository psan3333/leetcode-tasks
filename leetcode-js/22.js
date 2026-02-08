/**
 * @param {number} n
 * @return {string[]}
 */
// dynamic programming approach
var generateParenthesisDP = function (n) {
    if (n === 1) return ["()"];

    const variantsForN = [new Set(["()"])];
    let variantsBuffer = new Set([]);

    for (let i = 2; i <= n; i++) {
        for (let variant of Array.from(variantsForN[i - 2])) {
            variantsBuffer.add(`(${variant})`);
        }
        for (let j = i - 1, k = 1; j >= k; j--, k++) {
            const first = Array.from(variantsForN[j - 1]);
            const second = Array.from(variantsForN[k - 1]);
            for (let var1 of first) {
                for (let var2 of second) {
                    variantsBuffer.add(`${var1}${var2}`);
                    variantsBuffer.add(`${var2}${var1}`);
                }
            }
        }
        variantsForN.push(variantsBuffer);
        variantsBuffer = new Set([]);
    }

    return Array.from(variantsForN[variantsForN.length - 1]);
};

// backtracking method to solving leetcode 22
var generateParenthesis = function (n) {
    let result = [];
    let parenthesisCnt = {
        "(": 0,
        ")": 0,
    };
    let currStr = [];

    const generator = (bracket) => {
        if (parenthesisCnt["("] >= parenthesisCnt[")"]) {
            parenthesisCnt[bracket]++;
            currStr.push(bracket);
            if (parenthesisCnt["("] < n) generator("(");
            if (parenthesisCnt[")"] < n) generator(")");
            if (
                parenthesisCnt["("] === n &&
                parenthesisCnt[")"] === n &&
                currStr[currStr.length - 1] === ")"
            ) {
                result.push(currStr.join(""));
            }
            parenthesisCnt[bracket]--;
            currStr.pop();
        }
    };

    generator("(");
    return result;
};

let n = 8;
let res = generateParenthesis(n);
console.log(res.length);
