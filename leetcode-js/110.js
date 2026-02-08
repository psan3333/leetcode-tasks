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
 * @return {boolean}
 */
var isBalanced = function (root) {
    if (!root) return true;
    let result = true;

    const checkBalance = (node) => {
        if (!node) return 0;
        let leftHeight = checkBalance(node.left);
        let rightHeight = checkBalance(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) result = false;
        return Math.max(leftHeight, rightHeight) + 1;
    }
    checkBalance(root);
    return result;
};