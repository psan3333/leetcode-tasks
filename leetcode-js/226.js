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
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if (!root) return root;
    let result = root;

    let queue = [root];
    let newQueue = [];
    while (queue.length > 0) {
        for (let i = 0; i < queue.length; i++) {
            let temp = queue[i].left;
            queue[i].left = queue[i].right;
            queue[i].right = temp;
            if (queue[i].right) newQueue.push(queue[i].right);
            if (queue[i].left) newQueue.push(queue[i].left);
        }
        queue = newQueue;
        newQueue = [];
    }
    return result;
};