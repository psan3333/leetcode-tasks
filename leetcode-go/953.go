package main

func AreSorted(s1, s2 string, orderMap map[rune]int) bool {
	s1Runes := []rune(s1)
	s2Runes := []rune(s2)

	for i := 0; i < len(s1Runes); i++ {
		if i >= len(s2Runes) {
			return false
		}
		if orderMap[s1Runes[i]] < orderMap[s2Runes[i]] {
			return true
		} else if orderMap[s1Runes[i]] > orderMap[s2Runes[i]] {
			return false
		}
	}

	return true
}

func isAlienSorted(words []string, order string) bool {
	if len(words) <= 1 {
		return true
	}
	orderMap := map[rune]int{}

	for index, char := range order {
		orderMap[char] = index
	}

	for i := 0; i < len(words)-1; i++ {
		if !AreSorted(words[i], words[i+1], orderMap) {
			return false
		}
	}

	return true
}

// func main() {
// 	words := []string{""}
// 	order := "abcdefghijklmnopqrstuvwxyz"
// 	fmt.Println(isAlienSorted(words, order))
// }
