/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperaturesSub = function (temperatures) {
    let res = [];

    let trackMap = new Map();
    let maxVal = 0;

    for (let i = temperatures.length - 1; i >= 0; i--) {
        console.log(temperatures[i]);
        if (temperatures[i] >= maxVal) {
            maxVal = temperatures[i];
            res.push(0);
        }
        else {
            let closestIdx = temperatures.length - 1;
            for (let [temp, tempIdx] of trackMap) {
                if (temp > temperatures[i]) {
                    closestIdx = tempIdx < closestIdx ? tempIdx : closestIdx;
                }
            }
            res.push(closestIdx - i);
        }
        trackMap.set(temperatures[i], i);
    }

    return res.reverse();
};

var dailyTemperatures = function (temperatures) {
    let res = [];
    res.length = temperatures.length;
    res.fill(0);

    let stack = [0]; // only indexes

    for (let i = 1; i < temperatures.length; i++) {
        while (temperatures[stack[stack.length - 1]] < temperatures[i] && stack.length > 0) {
            res[stack[stack.length - 1]] = i - stack[stack.length - 1];
            stack.pop();
        }
        stack.push(i);
    }
    return res;
}

let temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
// let temperatures = [30, 40, 50, 60];
console.log(dailyTemperatures(temperatures));