package main

import (
	"math"
	"slices"
)

func rob2(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}
	max := func(num1, num2 int) int {
		return int(math.Max(float64(num1), float64(num2)))
	}
	maxInterval := func(start, end int) int {
		numsClone := slices.Clone(nums)
		for i := start; i < end; i++ {
			cacheBeforePrev := numsClone[i]
			if i-2 >= start {
				cacheBeforePrev += numsClone[i-2]
			}
			cacheInPrev := numsClone[i]
			if i-1 >= start {
				cacheInPrev = numsClone[i-1]
			}
			numsClone[i] = max(cacheBeforePrev, cacheInPrev)
		}
		return numsClone[end-1]
	}
	result := max(maxInterval(0, len(nums)-1), maxInterval(1, len(nums)))
	return result
}
