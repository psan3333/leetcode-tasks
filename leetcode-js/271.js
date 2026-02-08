// encode and decode string
// example 1: ['ab', 'b', 'c'] -> ab#b#c - encoded version
// exmple 2: -> 0011abc0010ab0010xy - идут четыре бита, которые обозначаю длину закодированной строки, затем идет сама строка этой длины

// easy approach
// function encode(str) {
//     return str.join('-');
// }

// function decode(str) {
//     return str.split('-');
// }

//better approach for real world
function encode(strs) {
    let encodedSequence = "";

    for (let i = 0; i < strs.length; i++) {
        let str = strs[i];
        let encodedStr = "";
        let currLetter = "";
        let currLetterCnt = 0;
        for (let char of str) {
            if (char != currLetter) {
                if (currLetterCnt > 1) {
                    encodedStr += `${currLetterCnt}${currLetter}`;
                } else {
                    encodedStr += currLetter;
                }
                currLetter = char;
                currLetterCnt = 0;
            }
            currLetterCnt++;
        }
        if (currLetterCnt > 1) {
            encodedStr += `${currLetterCnt}${currLetter}`;
        } else {
            encodedStr += currLetter;
        }
        encodedSequence += i != strs.length - 1 ? `${encodedStr}-` : encodedStr;
    }
    return encodedSequence;
}

function decode(str) {
    let result = [];
    let idx = 0;
    let charCodeZero = "0".charCodeAt(0);
    let charCodeNine = "9".charCodeAt(0);

    let currStr = "";
    while (idx < str.length) {
        if (str[idx] === "-") {
            result.push(currStr);
            currStr = "";
            idx++;
            continue;
        }

        let numberStr = "";
        while (
            str[idx].charCodeAt(0) >= charCodeZero &&
            str[idx].charCodeAt(0) <= charCodeNine
        ) {
            numberStr += str[idx];
            idx++;
        }

        let charCnt = 1;
        if (numberStr.length != 0) {
            charCnt = parseInt(numberStr);
        }
        currStr += str[idx].repeat(charCnt);
        idx++;
    }
    result.push(currStr);
    return result;
}

let str = ["abbbbbbbcccccdebbdd", "b", "c"];
let encoded = encode(str);
console.log(encoded);
console.log(decode(encoded));
