package main

import "strings"

func isPalindrome(s string) bool {
	s = strings.ToLower(s)
	filteredString := []rune{}
	for _, char := range s {
		if (char >= 48 && char <= 57) || (char >= 97 && char <= 122) {
			filteredString = append(filteredString, char)
		}
	}

	for i := 0; i < len(filteredString)/2; i++ {
		if filteredString[i] != filteredString[len(filteredString)-i-1] {
			return false
		}
	}
	return true
}
