function sortFunc(num1, num2) {
    // better approach to sort -
    // compare strings num1 + num2 and num2 + num1
    // if num1 + num2 >= num2 + num1, then don't swap elements in array
    for (let i = 0; i < Math.min(num1.length, num2.length); i++) {
        if (Number(num1[i]) < Number(num2[i])) {
            return 1;
        }
        if (Number(num1[i]) > Number(num2[i])) {
            return -1;
        }
    }
    if (num1.length < num2.length) {
        return sortFunc(num1, num2.slice(num1.length));
    } else if (num1.length === num2.length) {
        return 0;
    } else {
        return sortFunc(num1.slice(num2.length), num2);
    }
}

var largestNumber = function (nums) {
    if (Math.max(...nums) === 0) {
        return "0";
    }
    const numbersMap = new Map();
    nums.forEach((num) => {
        let strNum = num.toString();
        if (numbersMap.has(strNum[0])) {
            numbersMap.set(strNum[0], [...numbersMap.get(strNum[0]), strNum]);
        } else {
            numbersMap.set(strNum[0], [strNum]);
        }
    });

    let result = "";
    for (let i = 9; i >= 0; i--) {
        if (numbersMap.has(i.toString())) {
            let numsArr = numbersMap.get(i.toString());
            numsArr.sort(sortFunc);
            result += numsArr.join("");
        }
    }
    return result;
};

let nums = [111311, 1113];
console.log(largestNumber(nums));
