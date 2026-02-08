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
var isValidBST = function (root) {
    if (!root) return false;
    let isValid = true;

    const checkBST = (node) => {
        let nodeValues = [node.val, node.val];
        if (!isValid || (!node.left && !node.right)) return nodeValues;
        let leftValues = node.left ? checkBST(node.left) : nodeValues;
        let rightValues = node.right ? checkBST(node.right) : nodeValues;
        if (!isValid) return nodeValues;
        if (node.left && (Math.max(...leftValues) >= node.val)) isValid = false;
        if (node.right && (Math.min(...rightValues) <= node.val)) isValid = false;
        if (!isValid) return nodeValues;

        return [Math.min(...leftValues, ...rightValues, node.val), Math.max(...leftValues, ...rightValues, node.val)];
    }
    checkBST(root);
    return isValid;
};