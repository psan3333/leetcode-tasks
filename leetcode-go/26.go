package main

func removeDuplicates(nums []int) int {
	currNum := nums[0]
	currIdx := 0
	for _, num := range nums {
		if num != currNum {
			currNum = num
			currIdx++
			nums[currIdx] = num
		}
	}
	return currIdx + 1
}
