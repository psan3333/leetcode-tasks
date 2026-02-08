package main

// import "fmt"

// my variant - solves the problem
func firstMissingPositive(nums []int) int {
	const MAX_NUM int = 100000
	checkedNums := [MAX_NUM]bool{}

	for _, num := range nums {
		if num <= MAX_NUM && num >= 1 {
			checkedNums[num-1] = true
		}
	}

	result := 1
	for result <= MAX_NUM && checkedNums[result-1] {
		result++
	}
	return result
}

// func main() {
// 	nums := []int{-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
// 	fmt.Println(firstMissingPositive(nums))
// }
