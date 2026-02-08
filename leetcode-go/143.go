package main

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reorderList(head *ListNode) {
	if head == nil || head.Next == nil {
		return
	}

	list := head.Next
	endPoiner := &ListNode{
		Val:  list.Val,
		Next: nil,
	}

	for list.Next.Next != nil {
		temp := &ListNode{
			Val:  list.Next.Next.Val,
			Next: endPoiner,
		}
		endPoiner = temp
	}

	
}
