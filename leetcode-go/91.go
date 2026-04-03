package main

import (
	"fmt"
	"strconv"
)

func numDecodings(s string) int {
	dict := map[string]bool{}
	isInDict := func(start, end int) bool {
		return dict[s[start:end]]
	}
	for i := 1; i <= 26; i++ {
		dict[strconv.Itoa(i)] = true
	}
	dpArr := make([]int, len(s))
	if !isInDict(0, 1) {
		return 0
	}
	for i := 1; i < len(s); i++ {
		dpArr[i] = 0
	}
	dpArr[0] = 1
	for i := 1; i < len(s); i++ {
		isUpdated := false
		if isInDict(i, i+1) {
			dpArr[i] += dpArr[i-1]
			isUpdated = true
		}
		if isInDict(i-1, i+1) {
			if i-2 >= 0 {
				dpArr[i] += dpArr[i-2]
			} else {
				dpArr[i]++
			}
			isUpdated = true
		}
		if !isUpdated {
			return 0
		}
	}
	return dpArr[len(s)-1]
}

func main() {
	s := "1226"
	fmt.Println(numDecodings(s))
}
