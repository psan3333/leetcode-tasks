package main

func climbStairs(n int) int {
	oneBehind := 1
	twoBehind := 1
	result := 0
	for i := 1; i <= n; i++ {
		if i-2 < 0 {
			result = oneBehind
		} else {
			result = oneBehind + twoBehind
		}
		twoBehind = oneBehind
		oneBehind = result
	}
	return result
}
