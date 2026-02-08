/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function merge(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    }
    if (l1.val > l2.val) {
        let temp = l2;
        l2 = l1;
        l1 = temp;
    }
    let result = l1;
    l1 = l1.next;
    result.next = null;
    let startListNode = result;
    while (l1 && l2) {
        let insertNode = null;
        if (l1.val < l2.val) {
            insertNode = l1;
            l1 = l1.next;
        } else {
            insertNode = l2;
            l2 = l2.next;
        }
        insertNode.next = null;
        result.next = insertNode;
        result = result.next;
    }
    if (l1 === null && l2 != null) {
        result.next = l2;
    } else if (l2 === null && l1 != null) {
        result.next = l1;
    }
    return startListNode;
}

var sortList = function (head) {
    let listLength = 0;
    let list = head;
    while (list) {
        list = list.next;
        listLength++;
    }
    if (listLength <= 1) {
        return head;
    }

    let listIdx = 0;
    let firstList = head;
    while (listIdx < Math.floor(listLength / 2)) {
        listIdx++;
        if (listIdx === Math.floor(listLength / 2)) {
            let next = head.next;
            head.next = null;
            head = next;
        } else {
            head = head.next;
        }
    }
    let secondList = head;
    firstList = sortList(firstList);
    secondList = sortList(secondList);
    head = merge(firstList, secondList);
    return head;
};
