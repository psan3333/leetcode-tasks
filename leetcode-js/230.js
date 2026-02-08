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
 * @param {number} k
 * @return {number}
 */

class TreeBalancer {
    constructor(root) {
        this.root = root;
        this.root = this.traverse(this.root);
    }

    updateHeight(node) {
        if (!node) return null;
        node.height = Math.max(node?.left?.height || 0, node?.right?.height || 0) + 1;
        return node;
    }

    balanceFactor(node) {
        if (!node) return 0;
        console.log(node.height);
        const leftHeight = node?.left?.height || 0;
        const rightHeight = node?.right?.height || 0;
        return leftHeight - rightHeight;
    }

    traverse(node) {
        if (!node) return null;
        node.height = 0;
        node.left = this.traverse(node.left);
        node.right = this.traverse(node.right);

        if (this.balanceFactor(node) > 1) {
            if (this.balanceFactor(node.left) <= -1) {
                node.left = this.rotateLeft(node.left);
            }
            node = this.rotateRight(node);
        }
        else if (this.balanceFactor(node) < -1) {
            if (this.balanceFactor(node.right) >= 1) {
                node.right = this.rotateRight(node.right);
            }
            node = this.rotateLeft(node);
        }
        return this.updateHeight(node);
    }

    rotateLeft(node) {
        let rightLeft = node.right.left;
        let rightNode = node.right;
        rightNode.left = node;
        node.right = rightLeft;
        node = this.updateHeight(node);
        rightNode = this.updateHeight(rightNode);
        return rightNode;
    }

    rotateRight(node) {
        let leftRight = node.left.right;
        let leftNode = node.left;
        leftNode.right = node;
        node.left = leftRight;
        node = this.updateHeight(node);
        leftNode = this.updateHeight(leftNode);
        return leftNode;
    }

    findKthSmallest(k) {
        let nodesChecked = 0;
        let result;

        const treeSearch = (node) => {
            if (!node || nodesChecked > k) return;
            treeSearch(node.left);
            nodesChecked++;
            if (nodesChecked === k) {
                result = node.val;
                nodesChecked++;
                return;
            }
            treeSearch(node.right);
        }
        treeSearch(this.root);
        return result;
    }
}

var kthSmallest = function (root, k) {
    let balancedRoot = new TreeBalancer(root);
    console.log(balancedRoot.root);
    return balancedRoot.findKthSmallest(k);

};

// task actually don't require tree balancing))))))
var kthSmallestOptimal = function (root, k) {
    let nodesChecked = 0;
    let result;

    const treeSearch = (node) => {
        if (!node || nodesChecked > k) return;
        treeSearch(node.left);
        nodesChecked++;
        if (nodesChecked === k) {
            result = node.val;
            nodesChecked++;
            return;
        }
        treeSearch(node.right);
    }
    treeSearch(root);
    return result;

};