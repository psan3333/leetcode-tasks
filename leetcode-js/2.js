/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let result = l1;
    let l2Start = l2;
    let remainder = 0;
    while (true) {
        let val = (l1.val + l2.val + remainder) % 10;
        remainder = Math.floor((l1.val + l2.val + remainder) / 10);
        l1.val = val;
        if (!l1.next || !l2.next) break;
        l1 = l1.next;
        l2 = l2.next;
    }
    if (l1.next || l2.next) {
        if (!l1.next && l2.next) {
            l1.next = l2.next;
        }
        l1 = l1.next;
        while (true) {
            let val = (l1.val + remainder) % 10;
            remainder = Math.floor((l1.val + remainder) / 10);
            l1.val = val;
            if (!l1.next) break;
            l1 = l1.next;
        }
    }

    if (remainder !== 0) {
        l2Start.next = null;
        l2Start.val = remainder;
        l1.next = l2Start;
    }
    return result;
};