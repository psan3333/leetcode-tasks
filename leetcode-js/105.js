// SOLVED

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function BuildNode(val, left, right) {
    return { val, left, right };
}

var buildTree = function (preorder, inorder) {
    let currIdx = 0;

    let inorderIdxMap = new Map();
    inorder.forEach((inorderVertex, index) => inorderIdxMap.set(inorderVertex, { index, visited: false }));

    const builder = (inorderIdx, left, right) => {
        if (inorderIdx < 0
            || inorderIdx >= inorder.length
            || inorderIdxMap.get(inorder[inorderIdx]).visited
            || inorderIdx < left || inorderIdx > right
        ) return null;

        let node = BuildNode(preorder[currIdx], null, null);
        inorderIdxMap.set(preorder[currIdx], { ...inorderIdxMap.get(preorder[currIdx]), visited: true });
        currIdx++;
        if (currIdx >= inorder.length) return node;
        node.left = builder(
            inorderIdxMap.get(preorder[currIdx]).index,
            left, inorderIdx
        );
        if (!node.left) currIdx--;
        currIdx++;
        if (currIdx >= inorder.length) return node;
        node.right = builder(
            inorderIdxMap.get(preorder[currIdx]).index,
            inorderIdx, right
        );
        if (!node.right) currIdx--;
        return node;
    }
    return builder(
        inorderIdxMap.get(preorder[currIdx]).index,
        0, inorder.length - 1
    );
};
