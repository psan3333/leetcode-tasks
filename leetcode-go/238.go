package main

func productExceptSelf(nums []int) []int {
	answer := make([]int, len(nums))

	answer[0] = 1
	for i := 1; i < len(nums); i++ {
		answer[i] = answer[i-1] * nums[i-1]
	}

	prev := nums[len(nums)-1]
	for i := len(nums) - 2; i >= 0; i-- {
		answer[i] = answer[i] * prev
		prev *= nums[i]
	}

	return answer
}

// func main() {
// 	arr := []int{1, 2, 3, 4}

// 	productExceptSelf(arr)
// }
