/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */

class AVLTree {
    constructor() {
        this.root = null;
    }

    createNode(value, depth = 0, cnt = 1, left = null, right = null, cntLeft = 0, cntRight = 0) {
        return { value, depth, cnt, left, right, cntLeft, cntRight };
    }

    calcSubtreesCnt(node) {
        let cntLeft = 0;
        let cntRight = 0;

        if (node.left) {
            cntLeft = node.left.cnt + node.left.cntLeft + node.left.cntRight;
        }
        if (node.right) {
            cntRight = node.right.cnt + node.right.cntLeft + node.right.cntRight;
        }

        node.cntLeft = cntLeft;
        node.cntRight = cntRight;

        return node;
    }

    __insertNode(valueNode, node = this.root) {
        if (node === null) {
            node = valueNode;
            return node;
        }
        else {
            if (node.value === valueNode.value) {
                node.cnt += 1;
                return node;
            }
            else if (node.value < valueNode.value) {
                node.right = this.__insertNode(valueNode, node.right);
            }
            else if (node.value > valueNode.value) {
                node.left = this.__insertNode(valueNode, node.left);
            }
            return this.calcSubtreesCnt(this.balanceNode(this.calcDepth(node)));
        }
    }

    __removeValue(value, node = this.root) {
        if (node === null) {
            return null;
        }
        else {
            if (node.value === value) {
                if (node.cnt > 1) {
                    node.cnt -= 1;
                    return node;
                }
                else {
                    let left = node.left;
                    let right = node.right;
                    if (!left && !right) return null;
                    else if (!left && right) return right;
                    else if (!right && left) return left;
                    else {
                        if (left.depth > right.depth) {
                            node = left;
                            node = this.__insertNode(right, node);
                            node.left = this.balanceNode(this.calcDepth(node.left));
                        }
                        else {
                            node = right;
                            node = this.__insertNode(left, node);
                            node.right = this.balanceNode(this.calcDepth(node.right));
                            // console.log(node.right);
                        }
                    }
                }
            }
            else if (node.value < value) {
                node.right = this.__removeValue(value, node.right);
            }
            else if (node.value > value) {
                node.left = this.__removeValue(value, node.left);
            }
        }
        return this.calcSubtreesCnt(this.balanceNode(this.calcDepth(node)));
    }

    insert(value) {
        let valueNode = this.createNode(value);
        this.root = this.__insertNode(valueNode);
    }

    remove(value) {
        this.root = this.__removeValue(value);
    }

    calcBalance(node) {
        let leftDepth = node?.left ? node.left.depth + 1 : 0;
        let rightDepth = node?.right ? node.right.depth + 1 : 0;
        return leftDepth - rightDepth;
    }

    balanceNode(node) {
        let balance = this.calcBalance(node);
        // console.log(balance, node.left, node.right);
        if (balance > 1) {
            let childBalance = this.calcBalance(node.left);
            if (childBalance === -1) node.left = this.rotateRight(node.left);
            node = this.rotateLeft(node);
            // this.printTree(node);
        }
        else if (balance < -1) {
            let childBalance = this.calcBalance(node.right);
            if (childBalance === 1) node.right = this.rotateLeft(node.right);
            node = this.rotateRight(node);
            // this.printTree(node);
        }
        return node;
    }

    calcDepth(node) {
        if (!node) return node;
        if (!node?.left && !node?.right) {
            node.depth = 0;
        }
        else node.depth = Math.max((node.left?.depth || 0), (node.right?.depth || 0)) + 1;
        return node;
    }

    rotateRight(node) {
        let rightNode = node.right;
        let leftChild = rightNode.left;
        node.right = leftChild;
        rightNode.left = node;
        node = this.calcSubtreesCnt(this.calcDepth(node));
        rightNode = this.calcSubtreesCnt(this.calcDepth(rightNode));
        return rightNode;
    }

    rotateLeft(node) {
        let leftNode = node.left;
        let rightChild = leftNode.right;
        node.left = rightChild;
        leftNode.right = node;
        node = this.calcSubtreesCnt(this.calcDepth(node));
        leftNode = this.calcSubtreesCnt(this.calcDepth(leftNode));
        return leftNode;
    }

    printTree(node = this.root) {
        let arr = [node];
        let newArr = [];

        while (arr.length > 0) {
            let output = '';

            for (let node of arr) output += `${node.value} `;
            console.log(output);
            for (let node of arr) {
                if (node.left !== null) newArr.push(node.left);
                if (node.right !== null) newArr.push(node.right);
            }
            arr = newArr;
            newArr = [];
        }
    }

    getMax(node = this.root) {
        while (node.right) {
            node = node.right;
        }
        return node.value;
    }
}

var maxFrequency = function (nums, k, numOperations) {
    let maxFreq = 0;

    let currFreq = new Map();
    nums.forEach((value) => currFreq.set(value, (currFreq.get(value) || 0) + 1));

    for (let key of currFreq.keys()) {
        let keyFreq = currFreq.get(key);
        let operationRemaining = numOperations;
        for (let i = -k; i <= k && operationRemaining > 0; i++) {
            // if ()
        }
    }
};

let tests = [
    { nums: [1, 4, 5], k: 1, numOperations: 2, expectedResult: 2 },
    { nums: [5, 11, 20, 20], k: 5, numOperations: 1, expectedResult: 2 }
];

// let testPassed = 0;
// for (let test of tests) {
//     let { nums, k, numOperations, expectedResult } = test;
//     let result = maxFrequency(nums, k, numOperations);
//     testPassed = result === expectedResult;
// }

let tree = new AVLTree();
tests[1].nums.forEach(value => tree.insert(value));
// console.log(tree.root);