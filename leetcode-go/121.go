package main

// import "fmt"

func maxProfit(prices []int) int {
	minValue := prices[0]
	maxProfitValue := 0

	for _, price := range prices {
		if price-minValue > maxProfitValue {
			maxProfitValue = price - minValue
		}
		if price < minValue {
			minValue = price
		}
	}

	return maxProfitValue
}

// func main() {
// 	prices := []int{7, 4, 5, 10, 2, 8}
// 	fmt.Println(maxProfit(prices))
// }
