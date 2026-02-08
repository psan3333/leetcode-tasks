package main

// type ListNode struct {
// 	Val  int
// 	Next *ListNode
// }

func reverseList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	var result *ListNode
	for head.Next != nil {
		temp := head.Next
		head.Next = result
		result = head
		head = temp
	}
	return result
}
