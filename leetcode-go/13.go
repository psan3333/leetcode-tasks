package main

func romanToInt(s string) int {
	symbolMap := map[string]int{
		"I": 1,
		"V": 5,
		"X": 10,
		"L": 50,
		"C": 100,
		"D": 500,
		"M": 1000,
	}
	lettersOrder := map[string]int{
		"":  0,
		"I": 1,
		"V": 2,
		"X": 3,
		"L": 4,
		"C": 5,
		"D": 6,
		"M": 7,
	}

	result := 0
	maxOrderLetter := ""
	sRunes := []rune(s)
	for i := len(sRunes) - 1; i >= 0; i-- {
		char := string(sRunes[i])
		if lettersOrder[maxOrderLetter] > lettersOrder[char] {
			result -= symbolMap[char]
		} else {
			result += symbolMap[char]
			maxOrderLetter = char
		}
	}
	return result
}

// func main() {
// 	s := "MDXXI"
// 	fmt.Println(romanToInt(s))
// }
