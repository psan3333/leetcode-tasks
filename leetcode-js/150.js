/**
 * @param {string[]} tokens
 * @return {number}
 */

function toZero(num) {
    let floored = Math.abs(Math.floor(num));
    let ceiled = Math.abs(Math.ceil(num));
    return floored < ceiled ? Math.floor(num) : Math.ceil(num);
}

function calc(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return toZero(num1 * num2);
        case "/":
            return toZero(num1 / num2);
    }
}

var evalRPN = function (tokens) {
    const stack = [];
    const operands = new Set(['+', '-', '*', '/']);

    let index = 0;
    while (index < tokens.length) {
        if (operands.has(tokens[index])) {
            const num2 = stack.pop();
            const num1 = stack.pop();
            stack.push(calc(num1, num2, tokens[index]));
        }
        else stack.push(parseInt(tokens[index]));

        index++;
    }

    return stack[0];
};

// let rpn = ["-78", "-33", "196", "+", "-19", "-", "115", "+", "-", "-99", "/", "-18", "8", "*", "-86", "-", "-", "16", "/", "26", "-14", "-", "-", "47", "-", "101", "-", "163", "*", "143", "-", "0", "-", "171", "+", "120", "*", "-60", "+", "156", "/", "173", "/", "-24", "11", "+", "21", "/", "*", "44", "*", "180", "70", "-40", "-", "*", "86", "132", "-84", "+", "*", "-", "38", "/", "/", "21", "28", "/", "+", "83", "/", "-31", "156", "-", "+", "28", "/", "95", "-", "120", "+", "8", "*", "90", "-", "-94", "*", "-73", "/", "-62", "/", "93", "*", "196", "-", "-59", "+", "187", "-", "143", "/", "-79", "-89", "+", "-"];
// let rpn = ['3', '4', '*'];
let rpn = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
console.log(evalRPN(rpn));