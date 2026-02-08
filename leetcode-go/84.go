package main

func Max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func largestRectangleArea(heights []int) int {
	stack := []int{0}
	maxArea := 0

	for index := 0; index <= len(heights); index++ {
		currHeight := 0
		if index != len(heights) {
			currHeight = heights[index]
		}
		for len(stack) > 0 && currHeight < heights[stack[len(stack)-1]] {
			width := index
			height := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				width = index - stack[len(stack)-1] - 1
			}
			maxArea = Max(maxArea, height*width)
		}
		stack = append(stack, index)
	}

	return maxArea
}
