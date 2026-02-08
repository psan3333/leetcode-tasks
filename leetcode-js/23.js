/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

function merge(list1, list2) {
    if (!list1 && !list2) return null;
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1.val >= list2.val) {
        let temp = list1;
        list1 = list2;
        list2 = temp;
    }

    let result = list1;
    let currNode = list1;
    list1 = list1.next;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            currNode.next = list1;
            list1 = list1.next;
        }
        else {
            currNode.next = list2;
            list2 = list2.next;
        }
        currNode = currNode.next;
    }
    if (!list1) currNode.next = list2;
    else currNode.next = list1;
    return result;
}

var mergeKLists = function (lists) {
    if (lists.length === 0) return null;
    let toMerge = lists;
    let newToMerge = [];
    while (toMerge.length > 1) {
        for (let i = 0; i + 1 < toMerge.length; i += 2) {
            let list1 = toMerge[i];
            let list2 = toMerge[i + 1];
            newToMerge.push(merge(list1, list2));
        }
        console.log(toMerge.length);
        if (toMerge.length % 2 === 1) {
            let list = toMerge[toMerge.length - 1];
            newToMerge.push(list);
        }
        toMerge = newToMerge;
        newToMerge = [];
        // console.log(toMerge, toMerge.length);
    }
    return toMerge[0];
};