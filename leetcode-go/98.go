package main

import "math"

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func validateTree(root *TreeNode, isValid *bool) (int, int) {
	minLeftValue, maxLeftValue := validateTree(root.Left, isValid)
	minRightValue, maxRightValue := validateTree(root.Right, isValid)
	if !(*isValid) || maxLeftValue > root.Val || root.Val > minRightValue {
		*isValid = false
		min := int(math.Min(float64(minLeftValue), math.Min(float64(maxLeftValue), math.Min(float64(minRightValue), float64(maxRightValue)))))
		max := int(math.Max(float64(minLeftValue), math.Max(float64(maxLeftValue), math.Max(float64(minRightValue), float64(maxRightValue)))))
		return min, max
	}
	return minLeftValue, maxRightValue
}

func isValidBST(root *TreeNode) bool {
	isValid := false
	validateTree(root, &isValid)
	return isValid
}
