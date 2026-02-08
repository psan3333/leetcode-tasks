/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */

function NewNode(val, next, random) {
    return { val, next, random };
}

var copyRandomList = function (head) {
    if (!head) return null;
    let headCopy = head;
    while (headCopy) {
        let currNode = NewNode(headCopy.val, null, null);
        currNode.next = headCopy.next;
        headCopy.next = currNode;
        headCopy = currNode.next;
    }

    headCopy = head;
    while (headCopy) {
        let deepCopyNode = headCopy.next;
        let headRandom = headCopy.random;
        deepCopyNode.random = !headRandom ? null : headRandom.next;
        headCopy = deepCopyNode.next;
    }

    let result = null;
    headCopy = head;
    let currNode = headCopy.next;
    while (headCopy) {
        let headNext = currNode.next;
        if (result === null) {
            result = currNode;
        }
        else {
            currNode.next = !headNext?.next ? null : headNext.next;
            currNode = !currNode?.next ? null : currNode.next;
        }
        headCopy.next = headNext;
        headCopy = headCopy.next;
    }
    return result;
};

