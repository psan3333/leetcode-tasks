/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    let kTrack = new Map(); // track k-index for each letter inside window
    let letterTrack = new Map();
    let left = 0;
    let right = 0;
    let maxWindow = 0;
    let maxInWindow = 1;
    letterTrack.set(s[0], 1);
    kTrack.set(s[0], 0);

    const checkFilled = () => {
        let filledCnt = 0;
        for (let key of kTrack.keys()) {
            if (kTrack.get(key) > k) filledCnt++;
        }

        return filledCnt === Array.from(kTrack.keys()).length;
    }

    const setKForLetters = () => {
        for (let key of letterTrack.keys()) kTrack.set(key, (right - left + 1) - (letterTrack.get(key) || 0));
    }

    while (right < s.length) {
        // console.log(letterTrack, kTrack, s.slice(left, right + 1), "-");
        let windowFull = checkFilled();
        if (windowFull) {
            // console.log("WindowFull");
            letterTrack.set(s[right], (letterTrack.get(s[right]) || 0) - 1);
            right--;
            maxWindow = (right - left + 1) > maxWindow ? (right - left + 1) : maxWindow;
            while (checkFilled() && right < s.length) {
                left++;
                right++;
                letterTrack.set(s[left - 1], (letterTrack.get(s[left - 1]) || 0) - 1);
                letterTrack.set(s[right], (letterTrack.get(s[right]) || 0) + 1);
                setKForLetters();
                // console.log(letterTrack, kTrack, s.slice(left, right + 1));
            }
        }
        else {
            right++;
            letterTrack.set(s[right], (letterTrack.get(s[right]) || 0) + 1);
            setKForLetters();
        }
    }

    maxWindow = (right - left) > maxWindow ? (right - left) : maxWindow;
    return maxWindow;
};

var characterReplacementOptimal = (s, k) => {
    let left = 0, maxCount = 0;
    const freq = {};

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        freq[char] = (freq[char] || 0) + 1;
        maxCount = Math.max(maxCount, freq[char]);

        if (right - left + 1 - maxCount > k) {
            freq[s[left]]--;
            left++;
        }
    }

    return s.length - left;
}

// let s = "AAAABBBBABBBABAAAAAAAAAAAAAAABBBAAAAAAAAAAAAABBABBBBBAAAAA";
// let k = 3;
// let s = "ABAB";
// let k = 2;
// let s = "AABABBA";
// let k = 1;
console.log(characterReplacement(s, k));