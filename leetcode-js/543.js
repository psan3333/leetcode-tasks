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
var diameterOfBinaryTree = function (root) {
    if (!root) return 0;
    let result = 0;

    const diameter = (node) => {
        if (!node) return 0;
        let leftPath = diameter(node.left);
        let rightPath = diameter(node.right);
        result = Math.max(result, leftPath + rightPath);
        return Math.max(leftPath, rightPath) + 1;
    };

    diameter(root);
    return result;
};