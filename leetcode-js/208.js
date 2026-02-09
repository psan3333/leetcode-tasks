var Trie = function () {
    this.tree = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    if (word.length === 0) return;
    const insertLetters = (node, index) => {
        if (index === word.length - 1) {
            node.wordEnd = true;
            return;
        }
        let nextNode;
        if (word[index + 1] in node) {
            nextNode = node[word[index + 1]];
        } else {
            nextNode = {
                wordEnd: false,
                char: word[index + 1],
            };
            node[word[index + 1]] = nextNode;
        }
        insertLetters(nextNode, index + 1);
    };
    insertLetters(this.tree, -1);
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    if (word.length === 0) return false;

    const searchWord = (node, index) => {
        if (index === word.length - 1) {
            return node.wordEnd;
        } else {
            let nextNode = node[word[index + 1]];
            if (!nextNode) return false;
            return searchWord(nextNode, index + 1);
        }
    };
    return searchWord(this.tree, -1);
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    if (prefix === "") return true;

    const searchPrefix = (node, index) => {
        if (index === prefix.length - 1 && node.char === prefix[index])
            return true;

        let nextNode = node[prefix[index + 1]];
        if (!nextNode) return false;
        return searchPrefix(nextNode, index + 1);
    };
    return searchPrefix(this.tree, -1);
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
