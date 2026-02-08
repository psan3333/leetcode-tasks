package main

import (
	"slices"
)

func threeSum(nums []int) [][]int {
	target := 0
	triplets := [][]int{}
	slices.Sort(nums)

	for i := 0; i < len(nums)-1; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		left := i + 1
		right := len(nums) - 1
		sum := nums[i] + nums[left] + nums[right]
		for left < right {
			if sum == target {
				triplets = append(triplets, []int{nums[i], nums[left], nums[right]})
				left++
				for nums[left] == nums[left-1] && left < right {
					left++
				}
			}
			if sum > target {
				right--
			}
			if sum < target {
				left++
			}
			sum = nums[i] + nums[left] + nums[right]
		}
	}

	return triplets
}
