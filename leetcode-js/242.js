function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    let sMap = {};

    for (let i = 0; i < s.length; i++) {
        let charS = s[i];
        let charT = t[i];
        if (sMap[charS]) sMap[charS] += 1;
        else sMap[charS] = 1;

        if (sMap[charT]) sMap[charT] -= 1;
        else sMap[charT] = -1;
    }

    for (let char in sMap) {
        if (sMap[char] !== 0) return false;
    }

    return true;
}

let [s, t] = ["sdwjfg", "jfdwsg"];

console.log(isAnagram(s, t));