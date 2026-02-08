package main

func checkInclusion(s1 string, s2 string) bool {
	if len(s1) > len(s2) {
		return false
	}
	letterTrackMap := map[rune]int{}

	for _, char := range s1 {
		letterTrackMap[char] = letterTrackMap[char] + 1
	}

	cntLettersCompared := 0
	left := 0
	right := 0
	s2Runes := []rune(s2)
	for right < len(s1) {
		if letterCnt, ok := letterTrackMap[s2Runes[right]]; ok {
			if letterCnt == 0 {
				cntLettersCompared--
			} else if letterCnt-1 == 0 {
				cntLettersCompared++
			}
			letterTrackMap[s2Runes[right]]--
		}
		right++
	}
	right--

	for {
		if cntLettersCompared == len(letterTrackMap) {
			return true
		}
		if letterCnt, ok := letterTrackMap[s2Runes[left]]; ok {
			if letterCnt == 0 {
				cntLettersCompared--
			} else if letterCnt+1 == 0 {
				cntLettersCompared++
			}
			letterTrackMap[s2Runes[left]]++
		}
		left++
		right++
		if right >= len(s2) {
			break
		}
		if letterCnt, ok := letterTrackMap[s2Runes[right]]; ok {
			if letterCnt == 0 {
				cntLettersCompared--
			} else if letterCnt-1 == 0 {
				cntLettersCompared++
			}
			letterTrackMap[s2Runes[right]]--
		}
	}

	return false
}

// func main() {
// 	s1 := "adc"
// 	s2 := "dcda"
// 	fmt.Println(checkInclusion(s1, s2))
// }
