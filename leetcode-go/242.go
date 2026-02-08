package main

import "fmt"

func isAnagram(s string, t string) bool {
	anagramTrackMap := make(map[rune]int)

	for _, char := range s {
		if _, ok := anagramTrackMap[char]; !ok {
			anagramTrackMap[char] = 0
		}
		anagramTrackMap[char] += 1
	}

	amountOfZeros := 0
	for _, char := range t {
		if _, ok := anagramTrackMap[char]; !ok {
			return false
		}
		if anagramTrackMap[char] == 0 {
			amountOfZeros--
		}
		anagramTrackMap[char] -= 1
		if anagramTrackMap[char] == 0 {
			amountOfZeros++
		}
		fmt.Println(amountOfZeros, string(char), anagramTrackMap[char])
	}

	return amountOfZeros == len(anagramTrackMap)
}

// func main() {
// 	str1 := "anagram"
// 	str2 := "nagaram"

// 	res := isAnagram(str1, str2)
// 	fmt.Println(res)
// }
