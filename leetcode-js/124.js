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
var maxPathSum = function (root) {
    let result = -Infinity;

    const traverse = (node) => {
        if (!node) return -Infinity;
        const leftSum = traverse(node.left);
        const rightSum = traverse(node.right);
        const fullSum = leftSum + rightSum + node.val;
        result = Math.max(
            leftSum + node.val,
            rightSum + node.val,
            node.val,
            fullSum,
            result,
        );
        return Math.max(leftSum + node.val, rightSum + node.val, node.val);
    };
    traverse(root);
    return result;
};
