package main

func sortColors(nums []int) {
	index := 1

	for index < len(nums) {
		if nums[index] < nums[index-1] {
			nums[index], nums[index-1] = nums[index-1], nums[index]
			if index > 1 {
				index--
			}
		} else {
			index++
		}
	}
}
