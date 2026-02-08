package main

import (
	"math"
)

func lengthOfLongestSubstring(s string) int {
	letterTrack := map[rune]int{}
	sRunes := []rune(s)
	left, right := 0, 0
	maxWindow := 0.0

	for right < len(sRunes) {
		// fmt.Println(letterTrack, left, right)
		if len(letterTrack) == right-left {
			maxWindow = math.Max(float64(maxWindow), float64(right-left))
		} else {
			letterTrack[sRunes[left]]--
			if letterTrack[sRunes[left]] == 0 {
				delete(letterTrack, sRunes[left])
			}
			left++
		}
		letterTrack[sRunes[right]]++
		right++
		if right >= len(sRunes) {
			break
		}
	}
	if len(letterTrack) == right-left {
		maxWindow = math.Max(float64(maxWindow), float64(right-left))
	}
	return int(maxWindow)
}

// func main() {
// 	s := "abcdefghijklmnopqrstuvwxyzksdhgfasldkfjwearplikfg"
// 	fmt.Println(lengthOfLongestSubstring(s))
// }
