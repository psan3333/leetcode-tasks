/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    let reversed = head;
    let prev = null;
    let listLen = 0;
    while (true) {
        listLen++;
        reversed.prev = prev;
        prev = reversed;
        if (!reversed.next) {
            break;
        }
        reversed = reversed.next;
    }

    let result = null;
    let currNode = null;
    for (let i = 0; i < Math.floor(listLen / 2); i++) {
        if (currNode === null) {
            currNode = head;
        }
        else {
            currNode.next = head;
            currNode = currNode.next;
        }
        // console.log(head.val, reversed.val);
        head = head.next;
        currNode.next = reversed;
        reversed = reversed.prev;
        currNode = currNode.next;
        currNode.next = null;
    }
    if (listLen % 2 !== 0) {
        if (currNode === null) {
            currNode = head;
            result = currNode;
        }
        else {
            currNode.next = head;
            currNode = currNode.next;
        }
        currNode.next = null;
    }

    return result;
};