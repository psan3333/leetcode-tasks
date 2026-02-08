package main

func containsDuplicate(nums []int) bool {
	duplicates := make(map[int]bool, len(nums))

	for _, num := range nums {
		if _, ok := duplicates[num]; ok {
			return true
		} else {
			duplicates[num] = true
		}
	}

	return false
}
