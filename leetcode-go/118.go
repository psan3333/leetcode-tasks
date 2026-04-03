package main

import "fmt"

func generate(numRows int) [][]int {
	result := [][]int{
		{1},
	}
	for i := 2; i <= numRows; i++ {
		newRow := []int{1}
		for j := 1; j < i-1; j++ {
			newRow = append(newRow, result[i-2][j-1]+result[i-2][j])
		}
		newRow = append(newRow, 1)
		result = append(result, newRow)
	}
	return result
}

func main() {
	fmt.Println(generate(5))
}
