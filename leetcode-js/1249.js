/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
    let parenthesis = new Set(["(", ")"]);
    let validClosing = {
        ")": "(",
    };
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (parenthesis.has(char)) {
            if (
                char in validClosing &&
                stack.length > 0 &&
                validClosing[char] === stack[stack.length - 1].parenthesis
            ) {
                stack.pop();
            } else {
                stack.push({
                    parenthesis: char,
                    index: i,
                });
            }
        }
    }
    if (stack.length === 0) {
        return s;
    }

    let result = "";
    stack.sort((a, b) => a.index - b.index);
    let stackIdx = 0;
    for (let i = 0; i < s.length && stackIdx < stack.length; i++) {
        if (i === stack[stackIdx].index) {
            stackIdx++;
        } else {
            result += s[i];
        }
    }
    result += s.slice(stack[stackIdx - 1].index + 1);
    return result;
};
