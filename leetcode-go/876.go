package main

type ListNode struct {
	Val  int
	Next *ListNode
}

func middleNode(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	twoStepList := head
	oneStepList := head

	for {
		twoStepList = twoStepList.Next
		if twoStepList == nil {
			return oneStepList
		}
		twoStepList = twoStepList.Next
		if twoStepList == nil {
			return oneStepList.Next
		}
		oneStepList = oneStepList.Next
	}
}
