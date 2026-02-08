/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function reverseList(list) {
    if (list.next === null) return [list, list];
    let prevNode = null;
    let lastNode = list;

    while (list) {
        let temp = list.next;
        list.next = prevNode;
        prevNode = list;
        list = temp;
    }
    return [prevNode, lastNode];
}

var reverseKGroup = function (head, k) {
    let result = null;
    let listTrack = null;
    let currNode = head;

    while (currNode) {
        let list = head;
        let cnt = 1;
        while (cnt < k) {
            currNode = currNode.next;
            if (!currNode) break;
            cnt++;
        }
        if (cnt !== k) {
            if (!listTrack) {
                result = head;
                listTrack = head;
            } else listTrack.next = head;
            break;
        }

        head = currNode ? currNode.next : null;
        if (currNode) currNode.next = null;
        let [node, lastNode] = reverseList(list);
        if (!listTrack) {
            result = node;
            listTrack = node;
        } else listTrack.next = node;
        lastNode.next = head;
        listTrack = lastNode;
        currNode = head;
    }
    return result;
};
