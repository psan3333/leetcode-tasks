package main

func hasCycle(head *ListNode) bool {
	if head == nil || head.Next == nil {
		return false
	}
	slowPointer := head
	fastPointer := head

	for {
		fastPointer = fastPointer.Next
		if fastPointer == nil {
			return false
		}
		if fastPointer == slowPointer {
			return true
		}
		fastPointer = fastPointer.Next
		if fastPointer == nil {
			return false
		}
		if fastPointer == slowPointer {
			return true
		}
		slowPointer = slowPointer.Next
	}
}
