package main

func longestCommonPrefix(strs []string) string {
	commonPrefix := strs[0]

	for _, str := range strs {
		idx := 0
		for idx < len(commonPrefix) && idx < len(str) {
			if commonPrefix[idx] != str[idx] {
				commonPrefix = commonPrefix[:idx]
				break
			}
			idx++
		}
		if len(commonPrefix) > len(str) && idx >= len(str) {
			commonPrefix = commonPrefix[:idx]
		}
	}
	return commonPrefix
}
