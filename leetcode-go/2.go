package main

func twoSum(nums []int, target int) []int {
	negativeValues := make(map[int]int)

	for index, num := range nums {
		if negativeIndex, ok := negativeValues[target-num]; ok {
			return []int{index, negativeIndex}
		}
		negativeValues[num] = index
	}

	return []int{}
}
