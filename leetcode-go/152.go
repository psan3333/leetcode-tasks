package main

import "math"

func maxValue(nums ...int) int {
	max := nums[0]
	for i := 1; i < len(nums); i++ {
		max = int(math.Max(float64(max), float64(nums[i])))
	}
	return max
}

func minValue(nums ...int) int {
	min := nums[0]
	for i := 1; i < len(nums); i++ {
		min = int(math.Min(float64(min), float64(nums[i])))
	}
	return min
}

func maxProduct(nums []int) int {
	min := nums[0]
	max := nums[0]
	answer := nums[0]
	for i := 1; i < len(nums); i++ {
		num1 := nums[i]
		num2 := nums[i] * max
		num3 := nums[i] * min
		max = maxValue(num1, num2, num3)
		min = minValue(num1, num2, num3)
		answer = maxValue(max, answer)
	}
	return answer
}
