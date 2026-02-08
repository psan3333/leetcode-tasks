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
 * @return {number}
 */
var goodNodes = function (root) {
    if (!root) return 0;
    let max;
    let answer = 0;

    const traverseTree = (node) => {
        if (!node) return;
        if (stack.length === 0) {
            max = node.val;
            answer++;
        }
        else if (max <= node.val) {
            max = node.val;
            answer++;
        }
        let localMax = max;
        traverseTree(node.left);
        traverseTree(node.right);
        max = localMax;
    }
    traverseTree(root);
    return answer;
};