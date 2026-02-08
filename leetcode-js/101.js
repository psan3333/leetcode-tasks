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
var isSymmetric = function (root) {
    if (!root.left && !root.right) return true;
    if ((!root.left && root.right) || (root.left && !root.right)) return false;
    let result = true;

    const compareTrees = (p, q) => {
        if (!p && !q) return;
        if ((!p && q) || (p && !q) || p?.val !== q?.val) {
            result = false;
            return;
        }
        compareTrees(p.left, q.right);
        compareTrees(p.right, q.left);
    };
    compareTrees(root.left, root.right);
    return result;
};
