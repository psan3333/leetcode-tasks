package main

import (
	"math"
)

func searchMatrix(matrix [][]int, target int) bool {
	left := 0
	right := len(matrix)*len(matrix[0]) - 1
	index := int(math.Floor(float64(left+right) / 2))
	for left <= right {
		indexX := int(math.Floor(float64(left+right)/2)) % len(matrix[0])
		indexY := int(math.Floor(float64(left+right) / 2 / float64(len(matrix[0]))))

		if matrix[indexY][indexX] == target {
			return true
		}
		if matrix[indexY][indexX] < target {
			left = index + 1
		}
		if matrix[indexY][indexX] > target {
			right = index - 1
		}
		index = int(math.Floor(float64(left+right) / 2))
	}
	return false
}
