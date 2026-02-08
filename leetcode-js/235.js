/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let result = null;

    const treeTraverse = (node) => {
        if (!node || result !== null) return [false, false];
        let res = [false, false];
        let [pLeft, qLeft] = treeTraverse(node.left);
        let [pRight, qRight] = treeTraverse(node.right);
        res[0] = (res[0] || pLeft || pRight);
        res[1] = (res[1] || qLeft || qRight);
        if (node === p) res[0] = true;
        if (node === q) res[1] = true;
        if (res[0] && res[1]) {
            result = node;
            return [false, false];
        }
        return res;
    }
    treeTraverse(root);
    return result;
};