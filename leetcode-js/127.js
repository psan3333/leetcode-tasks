/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
    let hasEndWord = false;
    let beginWordIdx = null;
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i] === endWord) {
            hasEndWord = true;
            endWordIdx = i;
        }
        if (wordList[i] === beginWord) {
            beginWordIdx = i;
        }
    }
    if (!hasEndWord) return 0;

    const computeDiff = (word1, word2) => {
        let eq = 0;
        for (let i = 0; i < word1.length; i++) {
            eq += word1[i] === word2[i];
        }
        return word1.length - eq;
    };

    let queue = new Set();
    for (let i = 0; i < wordList.length; i++) {
        if (i !== beginWordIdx) queue.add(i);
    }
    let words = new Set([beginWord]);
    let newWords = new Set();
    let result = 1;
    while (queue.size > 0 && words.size > 0) {
        result++;
        for (let word of words.keys()) {
            for (let idx of queue.keys()) {
                if (computeDiff(wordList[idx], word) === 1) {
                    if (wordList[idx] === endWord) return result;
                    newWords.add(wordList[idx]);
                    queue.delete(idx);
                }
            }
        }
        words = newWords;
        newWords = new Set();
    }
    return 0;
};
