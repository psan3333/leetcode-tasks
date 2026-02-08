function isPalindrome(s) {
    const charset = new Set('abcdefghijklmnopqrstuvwxyz0123456789');

    s = Array.from(s.toLowerCase()).filter(char => charset.has(char)).join('');

    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        if (s[i] !== s[s.length - i - 1]) return false
    }
    return true;
}

let str = "race a car";
console.log(isPalindrome(str));