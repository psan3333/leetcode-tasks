package main

import "math"

func containsNearbyDuplicate(nums []int, k int) bool {
	duplicates := make(map[int]int)

	for index, num := range nums {
		if dupIdx, ok := duplicates[num]; ok && int(math.Abs(float64(index-dupIdx))) <= k {
			return true
		}
		duplicates[num] = index
	}

	return false
}
