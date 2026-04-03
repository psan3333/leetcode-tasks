package main

import (
	"fmt"
	"math"
)

func coinChange(coins []int, amount int) int {
	if amount == 0 {
		return 0
	}
	min := func(num1, num2 int) int {
		return int(math.Min(float64(num1), float64(num2)))
	}
	dpArr := make([]int, amount+1)
	for i := 0; i <= amount; i++ {
		dpArr[i] = math.MaxInt
	}
	dpArr[0] = 0
	for i := 1; i <= amount; i++ {
		for _, coin := range coins {
			if i-coin >= 0 && dpArr[i-coin] != math.MaxInt {
				dpArr[i] = min(dpArr[i], dpArr[i-coin]+1)
			}
		}
	}
	if dpArr[amount] == math.MaxInt {
		return -1
	} else {
		return dpArr[amount]
	}
}

func main() {
	coins := []int{2}
	amount := 5
	fmt.Println(coinChange(coins, amount))
}
