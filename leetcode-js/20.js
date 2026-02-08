/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (s.length % 2 != 0) return false;
    let relations = {
        "{": "}",
        "}": "{",
        "[": "]",
        "]": "[",
        "(": ")",
        ")": "("
    };
    let openBrack = new Set(Array.from("[({"));
    let closeBrack = new Set(Array.from("])}"));
    let trackBrackets = new Map();
    let order = 0;
    for (let char of s) {
        if (openBrack.has(char)) {
            trackBrackets.set(order, char);
            order++;
        }
        else if (closeBrack.has(char)) {
            if (trackBrackets.get(order - 1) != relations[char]) return false;
            trackBrackets.delete(order);
            order--;
        }
    }
    return order === 0;
};

let tests = [
    { s: "()[]{}", exp: true },
    { s: "{}", exp: true },
    { s: "(]", exp: false },
    { s: "([])", exp: true },
    { s: "([)]", exp: false },
    { s: "({[([{}()(]){})]})", exp: false }
];

let correct = 0;
for (let test of tests) {
    correct += isValid(test["s"]) === test["exp"];
}
console.log(correct === tests.length);