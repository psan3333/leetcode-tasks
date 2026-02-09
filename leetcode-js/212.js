/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

class Trie {
    constructor() {
        this.trie = {};
        this.maxWordLength = 0;
    }

    insertWord(word) {
        this.maxWordLength = Math.max(this.maxWordLength, word.length);
        const insert = (node, index) => {
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
            insert(nextNode, index + 1);
        };
        insert(this.trie, -1);
    }
}

var findWords = function (board, words) {
    let result = new Set();
    let dictionary = new Trie();
    words.forEach((word) => dictionary.insertWord(word));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j] = {
                visited: false,
                value: board[i][j],
            };
        }
    }

    function checkPrefix(item, x, y) {
        const { word, trieEntry } = item;
        if (
            x >= 0 &&
            x < board.length &&
            y >= 0 &&
            y < board[0].length &&
            !board[x][y].visited &&
            word.length <= dictionary.maxWordLength
        ) {
            return board[x][y].value in trieEntry;
        }
        return false;
    }

    function searchCoord(item, x, y) {
        const { word, trieEntry } = item;
        if (!trieEntry[board[x][y].value]) return;
        board[x][y].visited = true;
        searchWords({
            word: word + board[x][y].value,
            pos: [x, y],
            trieEntry: trieEntry[board[x][y].value],
        });
        board[x][y].visited = false;
    }

    function searchWords(item) {
        const { word, trieEntry, pos } = item;
        let [x, y] = pos;
        if (trieEntry.wordEnd) {
            result.add(word);
        }

        if (checkPrefix(item, x - 1, y)) {
            searchCoord(item, x - 1, y);
        }
        if (checkPrefix(item, x, y - 1)) {
            searchCoord(item, x, y - 1);
        }
        if (checkPrefix(item, x + 1, y)) {
            searchCoord(item, x + 1, y);
        }
        if (checkPrefix(item, x, y + 1)) {
            searchCoord(item, x, y + 1);
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            searchCoord(
                {
                    word: "",
                    trieEntry: dictionary.trie,
                },
                i,
                j,
            );
        }
    }

    return Array.from(result);
};
