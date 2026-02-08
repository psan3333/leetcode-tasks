/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {

    let listLen = 0;
    let headCopy = head;
    while (headCopy) {
        listLen++;
        headCopy = headCopy.next;
    }

    let result = head;
    let prevNode = null;
    for (let i = 0; i < listLen - n; i++) {
        prevNode = head;
        head = head.next;
    }

    if (prevNode === null) {
        result = result.next;
    }
    else {
        prevNode.next = head.next;
    }
    return result;
};