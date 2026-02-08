package main

import "strconv"

func fireOperator(num1, num2 int, operator string) int {
	switch operator {
	case "+":
		return num1 + num2
	case "-":
		return num1 - num2
	case "*":
		return num1 * num2
	case "/":
		return num1 / num2
	default:
		return 0
	}
}

func evalRPN(tokens []string) int {
	stack := []int{}
	operatorTokens := map[string]bool{
		"+": true,
		"-": true,
		"*": true,
		"/": true,
	}

	for _, token := range tokens {
		if operatorTokens[token] {
			number2 := stack[len(stack)-1]
			number1 := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, fireOperator(number1, number2, token))
		} else {
			number, _ := strconv.ParseInt(token, 0, 64)
			stack = append(stack, int(number))
		}
	}
	return stack[0]
}
