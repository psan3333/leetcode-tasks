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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    let result = false;

    const compareTrees = (node1, node2) => {
        if (!node1 && !node2) return true;
        if ((!node1 && node2) || (node1 && !node2) || (node1.val !== node2.val)) {
            return false;
        }
        let left = compareTrees(node1.left, node2.left);
        let right = compareTrees(node1.right, node2.right);
        return left && right;
    }

    const checkSubtree = (node) => {
        if (!node) return;
        result = result || compareTrees(node, subRoot);
        checkSubtree(node.left);
        checkSubtree(node.right);
    }

    checkSubtree(root);
    return result;
};