package main

import (
	"math"
)

func maxArea(height []int) int {
	left := 0
	right := len(height) - 1
	maxVolume := 0.0

	for left < right {
		width := float64(right - left)
		volume := math.Min(float64(height[left]), float64(height[right])) * width
		maxVolume = math.Max(volume, maxVolume)
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return int(maxVolume)
}
