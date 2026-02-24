var getDictionary = function (words) {
    let graph = {};
    let uniqueLetters = new Set();
    words.forEach((word) => {
        for (let i = 0; i < word.length; i++) {
            uniqueLetters.add(word[i]);
        }
    });

    let groups = [{ index: 0, words }];
    let newGroups = [];
    let addedKeys = new Set();
    const samePrefix = ({ index, words }) => {
        for (let i = 0; i < words.length - 1; i++) {
            if (words[i][index] !== words[i + 1][index]) return false;
        }
        return true;
    };

    while (groups.length > 0) {
        for (let group of groups) {
            for (let i = 0; i < group.words.length - 1; i++) {
                // all words must be in increasing order, which includes
                // increasing length for words with the same prefix
                // [mac, macdonalds] - not [macdonalds, mac]
                if (group.words[i].length > group.words[i + 1].length)
                    return "";
            }
            while (group.words.length > 1 && samePrefix(group)) {
                group.index++;
                group.words = group.words.filter(
                    (word) => word.length > group.index,
                );
            }
            if (group.words.length <= 1) continue;

            let idx = group.index;
            let groupWords = group.words;
            let lettersOrder = [groupWords[0][idx]];
            let newGroup = [groupWords[0]];
            for (let i = 1; i < groupWords.length; i++) {
                if (
                    groupWords[i][idx] != lettersOrder[lettersOrder.length - 1]
                ) {
                    newGroups.push({ index: idx + 1, words: newGroup });
                    lettersOrder.push(groupWords[i][idx]);
                    newGroup = [];
                }
                newGroup.push(groupWords[i]);
            }
            if (newGroup.length > 1)
                newGroups.push({ index: idx + 1, words: newGroup });

            for (let i = 0; i < lettersOrder.length - 1; i++) {
                let letter = lettersOrder[i];
                let nextLetter = lettersOrder[i + 1];
                addedKeys.add(letter);
                addedKeys.add(nextLetter);
                if (!(letter in graph)) {
                    graph[letter] = {
                        next: [],
                        depth: 0,
                    };
                }
                if (!(nextLetter in graph)) {
                    graph[nextLetter] = {
                        next: [],
                        depth: 0,
                    };
                }
                graph[letter].next.push(nextLetter);
            }
        }
        groups = newGroups;
        newGroups = [];
    }
    if (addedKeys.size !== uniqueLetters.size) return "";

    let dfsStack = new Set();
    let maxStack = [];
    let stack = [];
    let hasCycle = false;
    let depth = 0;
    const traverse = (node) => {
        depth++;
        graph[node].depth = Math.max(graph[node].depth, depth);
        dfsStack.add(node);
        stack.push(node);
        if (stack.length > maxStack.length) maxStack = [...stack];
        for (let next of graph[node].next) {
            if (hasCycle) return;
            if (dfsStack.has(next)) {
                hasCycle = true;
                return;
            }
            traverse(next);
        }
        stack.pop();
        dfsStack.delete(node);
        depth--;
    };
    traverse(words[0][0]);
    if (hasCycle) return "";
    return maxStack.join("");
};

let words = ["wrt", "wrf", "er", "ett", "rftt"];
console.log(getDictionary(words));
