package main

func isValid(s string) bool {
	parenthesisTrack := []string{}
	// check only open parenthesis before closing ones
	parenthesisTypes := map[string]string{
		")": "(",
		"}": "{",
		"]": "[",
	}

	for _, parenthesisRune := range s {
		parenthesis := string(parenthesisRune)
		if len(parenthesisTrack) != 0 && parenthesisTypes[parenthesis] == parenthesisTrack[len(parenthesisTrack)-1] {
			parenthesisTrack = parenthesisTrack[:len(parenthesisTrack)-1]
		} else {
			parenthesisTrack = append(parenthesisTrack, parenthesis)
		}
	}
	return len(parenthesisTrack) == 0
}
