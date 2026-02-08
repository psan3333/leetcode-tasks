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
var zigzagLevelOrder = function (root) {
    if (!root) return [];

    let result = [];
    let currentLevelNodes = [root];
    let nextLevelNodes = [];
    let levelNodesValues = [];
    let order = 1;

    while (currentLevelNodes.length > 0) {
        for (let i = 0; i < currentLevelNodes.length; i++) {
            levelNodesValues.push(currentLevelNodes[i].val);
            if (currentLevelNodes[i].left) {
                nextLevelNodes.push(currentLevelNodes[i].left);
            }
            if (currentLevelNodes[i].right) {
                nextLevelNodes.push(currentLevelNodes[i].right);
            }
        }
        if (order < 0) {
            levelNodesValues.reverse();
        }
        result.push(levelNodesValues);
        levelNodesValues = [];
        currentLevelNodes = nextLevelNodes;
        nextLevelNodes = [];
        order *= -1;
    }
};
