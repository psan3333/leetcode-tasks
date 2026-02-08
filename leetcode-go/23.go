package main

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeLists(l1, l2 *ListNode) *ListNode {
	if l1 == nil {
		return l2
	} else if l2 == nil {
		return l1
	}
	if l1.Val > l2.Val {
		temp := l2
		l2 = l1
		l1 = temp
	}
	temp := l1.Next
	result := l1
	result.Next = nil
	l1 = temp
	traverseNode := result
	for l1 != nil && l2 != nil {
		insertNode := l1
		temp = l1.Next
		if l1.Val > l2.Val {
			temp = l2.Next
			insertNode = l2
			l2 = temp
		} else {
			l1 = temp
		}
		insertNode.Next = nil
		traverseNode.Next = insertNode
		traverseNode = traverseNode.Next
	}
	if l2 == nil && l1 != nil {
		traverseNode.Next = l1
	} else if l1 == nil && l2 != nil {
		traverseNode.Next = l2
	}
	return result
}

func mergeKLists(lists []*ListNode) *ListNode {
	if len(lists) == 0 {
		return nil
	}
	if len(lists) == 1 {
		return lists[0]
	}
	listOfLists := []*ListNode{}

	for len(lists) > 1 {
		index := 0
		for index+1 < len(lists) {
			mergedList := mergeLists(lists[index], lists[index+1])
			// fmt.Println(mergedList, mergedList.Next)
			listOfLists = append(listOfLists, mergedList)
			index += 2
		}
		if index+1 == len(lists) {
			listOfLists = append(listOfLists, lists[len(lists)-1])
		}
		// fmt.Println(len(listOfLists))
		lists = listOfLists
		listOfLists = []*ListNode{}
	}
	return lists[0]
}
