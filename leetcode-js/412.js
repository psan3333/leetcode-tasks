/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    let result = [];
    let stringMap = {
        3: "Fizz",
        5: "Buzz",
    };

    for (let i = 1; i <= n; i++) {
        let str = "";
        for (let key in stringMap) {
            if (i % key === 0) {
                str += stringMap[key];
            }
        }
        if (str === "") {
            str = `${i}`;
        }
        result.push(str);
    }
    return result;
};

console.log(fizzBuzz(15));
