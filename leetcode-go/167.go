package main

func twoSumSort(numbers []int, target int) []int {
	left := 0
	right := len(numbers) - 1
	sum := numbers[left] + numbers[right]

	for left < right {
		if sum == target {
			return []int{left + 1, right + 1}
		}
		if sum > target {
			right--
		}
		if sum < target {
			left++
		}
		sum = numbers[left] + numbers[right]
	}
	return []int{}
}
