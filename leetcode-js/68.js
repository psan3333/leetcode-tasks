/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
// accepted
var fullJustify = function (words, maxWidth) {
    let result = [];
    let currentLine = [];
    let numberOfLettersInLine = 0;

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (
            word.length + numberOfLettersInLine + currentLine.length <=
            maxWidth
        ) {
            currentLine.push(word);
            numberOfLettersInLine += word.length;
        } else {
            let fullJustifyLine = "";
            let remainingSpace = maxWidth - numberOfLettersInLine;
            let splitSpacesAmount =
                currentLine.length > 1
                    ? Math.floor(remainingSpace / (currentLine.length - 1))
                    : remainingSpace;
            let spaceToDistribute = remainingSpace % (currentLine.length - 1);

            for (let wordIdx = 0; wordIdx < currentLine.length - 1; wordIdx++) {
                fullJustifyLine += currentLine[wordIdx];
                if (spaceToDistribute > 0) {
                    fullJustifyLine += " ";
                    spaceToDistribute--;
                }
                fullJustifyLine += " ".repeat(splitSpacesAmount);
            }
            fullJustifyLine += currentLine[currentLine.length - 1];
            if (currentLine.length == 1)
                fullJustifyLine += " ".repeat(splitSpacesAmount);

            result.push(fullJustifyLine);
            currentLine = [word];
            numberOfLettersInLine = word.length;
        }
        if (i === words.length - 1) {
            let fullJustifyLine = "";
            for (let wordIdx = 0; wordIdx < currentLine.length - 1; wordIdx++) {
                fullJustifyLine += currentLine[wordIdx] + " ";
            }
            fullJustifyLine += currentLine[currentLine.length - 1];
            fullJustifyLine += " ".repeat(
                maxWidth - (numberOfLettersInLine + currentLine.length - 1),
            );
            result.push(fullJustifyLine);
        }
    }
    return result;
};

let tests = [
    {
        words: ["This", "is", "an", "example", "of", "text", "justification."],
        maxWidth: 16,
        expected: ["This    is    an", "example  of text", "justification.  "],
    },
    {
        words: ["What", "must", "be", "acknowledgment", "shall", "be"],
        maxWidth: 16,
        expected: ["What   must   be", "acknowledgment  ", "shall be        "],
    },
    {
        words: [
            "Science",
            "is",
            "what",
            "we",
            "understand",
            "well",
            "enough",
            "to",
            "explain",
            "to",
            "a",
            "computer.",
            "Art",
            "is",
            "everything",
            "else",
            "we",
            "do",
        ],
        maxWidth: 20,
        expected: [
            "Science  is  what we",
            "understand      well",
            "enough to explain to",
            "a  computer.  Art is",
            "everything  else  we",
            "do                  ",
        ],
    },
];

let testsPassed = 0;
for (let test of tests) {
    let words = test.words;
    let maxWidth = test.maxWidth;
    let expected = test.expected;
    let testResult = fullJustify(words, maxWidth);
    if (testResult.length != expected.length) {
        console.log(
            `FAILED!\nwords:${words}\nmaxWidth:${maxWidth}\nexpected:${expected}\nResult:${testResult}`,
        );
        continue;
    } else {
        let passed = 0;
        for (let i = 0; i < expected.length; i++) {
            passed += testResult[i] === expected[i];
        }
        if (passed === expected.length) {
            testsPassed++;
            console.log(
                `PASSED!\nwords:${words}\nmaxWidth:${maxWidth}\nexpected:${expected}`,
            );
        } else {
            console.log(
                `FAILED!\nwords:${words}\nmaxWidth:${maxWidth}\nexpected:${expected}\nResult:${testResult}`,
            );
        }
    }
}
if (testsPassed === tests.length) {
    console.log("ALL TESTS PASSED!!!");
}
