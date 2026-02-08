/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];
    let result = [];

    let levelQueue = [root];
    let currLevel = [];
    let nextLevel = [];
    while (levelQueue.length > 0) {
        for (let i = 0; i < levelQueue.length; i++) {
            currLevel.push(levelQueue[i].val);
            if (levelQueue[i].left) nextLevel.push(levelQueue[i].left);
            if (levelQueue[i].right) nextLevel.push(levelQueue[i].right);
        }
        result.push(currLevel);
        currLevel = [];
        levelQueue = nextLevel;
        nextLevel = [];
    }
    return result;
};
