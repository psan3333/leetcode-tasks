package main

import (
	"math"
)

func rob(nums []int) int {
	for index, num := range nums {
		cacheBeforePrevHouse := num
		if index-2 >= 0 {
			cacheBeforePrevHouse += nums[index-2]
		}
		cacheInPrevHouse := 0
		if index-1 >= 0 {
			cacheInPrevHouse = nums[index-1]
		}
		nums[index] = int(math.Max(float64(cacheInPrevHouse), float64(cacheBeforePrevHouse)))
	}
	return nums[len(nums)-1]
}
