var longestPalindrome = function (s) {
    let result = "";

    for (let i = 0; i < s.length; i++) {
        let left = i,
            right = i;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            right++;
            left--;
        }
        if (right - left - 1 > result.length) {
            result = s.slice(left + 1, right);
        }

        left = i;
        right = i + 1;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            right++;
            left--;
        }
        if (right - left - 1 > result.length) {
            result = s.slice(left + 1, right);
        }
    }
    return result;
};

let s = "abbcde";
console.log(longestPalindrome(s));
