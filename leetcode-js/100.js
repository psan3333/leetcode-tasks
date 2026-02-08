/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    let result = true;

    const compareTrees = (p, q) => {
        if (!p && !q) return;
        if ((!p && q) || (p && !q) || (p?.val !== q?.val)) {
            result = false;
            return;
        }
        compareTrees(p.left, q.left);
        compareTrees(p.right, q.right);
    }
    compareTrees(p, q);
    return result;
};