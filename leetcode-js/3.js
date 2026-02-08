function longestSubstringLength(s) {
    let maxLength = 0,
        idx = 0, startIdx = 0,
        charMap = new Map();

    while (true) {
        while (idx < s.length) {
            if (charMap.has(s[idx])) {
                let substrLen = Array.from(charMap.keys()).length;
                // console.log(Array.from(charMap.keys()), startIdx);
                let newStart = charMap.get(s[idx]) + 1;
                maxLength = maxLength < substrLen ? substrLen : maxLength;
                for (let i = startIdx; i <= charMap.get(s[idx]); i++) charMap.delete(s[i]);

                // update variables for next substring
                startIdx = newStart;
                charMap.set(s[idx], idx);
                idx++;
                break;
            }
            else charMap.set(s[idx], idx);
            idx++;
        }
        if (idx >= s.length) {
            // additional check in case full string has unique characters
            let substrLen = Array.from(charMap.keys()).length;
            console.log(Array.from(charMap.keys()));
            maxLength = maxLength < substrLen ? substrLen : maxLength;
            break;
        };
    }
    return maxLength;
}

function longestSubstringLengthOptimal(s) {
    let maxLength = 0,
        idx = 0, startIdx = 0, substrLen = 0,
        charMap = new Map();

    while (true) {
        while (idx < s.length) {
            if (charMap.has(s[idx])) {
                let newStart = charMap.get(s[idx]) + 1;
                for (let i = startIdx; i <= charMap.get(s[idx]); i++) charMap.delete(s[i]);
                substrLen -= newStart - startIdx - 1;
                startIdx = newStart;
                charMap.set(s[idx], idx);
                idx++;
                break;
            }
            else charMap.set(s[idx], idx);
            substrLen++;
            maxLength = maxLength < substrLen ? substrLen : maxLength;
            idx++;
        }
        if (idx >= s.length) {
            // additional check in case full string has unique characters
            maxLength = maxLength < substrLen ? substrLen : maxLength;
            break;
        };
    }
    return maxLength;
}

let s = "pwwkew";
console.log(longestSubstringLengthOptimal(s));