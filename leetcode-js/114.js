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
 * @return {void} Do not return anything, modify root in-place instead.
 */

function getPreorder(root) {
    if (!root) return;
    if (!root.left && !root.right) return [root, root];
    let leftRoot = root.left;
    let rightRoot = root.right;
    let lastNodeInFlatten = root;
    let res = getPreorder(leftRoot);
    if (res) {
        lastNodeInFlatten = res[1];
        root.right = res[0];
    }
    res = getPreorder(rightRoot);
    if (res) {
        lastNodeInFlatten.right = res[0];
        lastNodeInFlatten = res[1];
    }
    return [root, lastNodeInFlatten];
}

var flatten = function (root) {
    getPreorder(root);
};
