package main

import "math"

func search(nums []int, target int) int {
	left := 0
	right := len(nums) - 1
	index := int(math.Floor(float64(left+right) / 2))

	for left <= right {
		if nums[index] == target {
			return index
		}
		if nums[index] < target {
			left = index + 1
		}
		if nums[index] > target {
			right = index - 1
		}
		index = int(math.Floor(float64(left+right) / 2))
	}
	return -1
}
