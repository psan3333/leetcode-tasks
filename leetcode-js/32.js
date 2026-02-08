/**
 * @param {string} s
 * @return {number}
 */
// solved inside Leetcode editor without syntax check
var longestValidParentheses = function (s) {
    if (s.length <= 1) return 0;
    const isParenthesis = (s) => s === "(" || s === ")";
    const isClosingParenthesis = (s) => s === ")";
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        if (isParenthesis(s[i])) {
            if (
                stack.length > 0 &&
                isClosingParenthesis(s[i]) &&
                stack[stack.length - 1].parenthesis === "("
            ) {
                stack.pop();
            } else {
                stack.push({
                    parenthesis: s[i],
                    index: i,
                });
            }
        }
    }
    if (stack.length === 0) {
        return s.length;
    }

    stack.sort((a, b) => a.index - b.index);
    let result = "";
    let currentStr = "";
    let stackIndex = 0;
    for (let i = 0; i < s.length && stackIndex < stack.length; i++) {
        if (i === stack[stackIndex].index) {
            result = currentStr.length > result.length ? currentStr : result;
            currentStr = "";
            stackIndex++;
        } else {
            currentStr += s[i];
        }
    }
    currentStr += s.slice(stack[stack.length - 1].index + 1);
    return currentStr.length > result.length
        ? currentStr.length
        : result.length;
};
