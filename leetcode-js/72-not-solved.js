/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    let result = word1.length + word2.length;

    let lettersForReplacement = new Set(Array.from(word2));
};
