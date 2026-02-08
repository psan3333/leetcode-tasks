function groupAnagrams(strs) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    let groups = new Map();

    strs.forEach((str) => {
        let mask = Array.from({ length: 26 }).fill(0);

        for (let char of str) {
            mask[char.charCodeAt() - 97] += 1;
            console.log(mask[char.charCodeAt() - 97]);
        }

        let maskStr = mask.join("-");
        console.log(maskStr, mask);

        if (groups.has(maskStr)) {
            let anagrams = groups.get(maskStr);
            groups.set(maskStr, [...anagrams, str]);
        } else {
            groups.set(maskStr, [str]);
        }
    });

    let result = [];

    for (let [key, value] of groups) {
        result.push(value);
    }

    return result;
}

function groupAnagrams2(strs) {
    let groups = new Map();

    strs.forEach((str) => {
        let sortedStr = Array.from(str).sort().join("");

        if (groups.has(sortedStr)) {
            let anagrams = groups.get(sortedStr);
            groups.set(sortedStr, [...anagrams, str]);
        } else {
            groups.set(sortedStr, [str]);
        }
    });

    let result = [];

    for (let [key, value] of groups) {
        result.push(value);
    }

    return result;
}

let strs = ["bdddddddddd", "bbbbbbbbbbc"];

console.log(groupAnagrams(strs));
