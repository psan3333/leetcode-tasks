package main

func findDuplicate(nums []int) int {
	slow := nums[0]
	fast := nums[nums[0]]

	for slow != fast {
		slow = nums[slow]
		fast = nums[nums[fast]]
	}

	slow = 0
	for slow != fast {
		slow = nums[slow]
		fast = nums[fast]
	}
	return slow
}

// func main() {
// 	nums := []int{1, 4, 3, 4, 5, 2}
// 	fmt.Println(findDuplicate(nums))
// }
