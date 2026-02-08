package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func traverseFunc(root *TreeNode, maxStack []int) int {
	if root == nil {
		return 0
	}
	result := 0
	if len(maxStack) == 0 {
		result++
		maxStack = append(maxStack, root.Val)
	} else if root.Val > maxStack[len(maxStack)-1] {
		result++
		maxStack = append(maxStack, root.Val)
	}
	result += traverseFunc(root.Left, maxStack)
	result += traverseFunc(root.Right, maxStack)
	if root.Val == maxStack[len(maxStack)-1] {
		maxStack = maxStack[:len(maxStack)-1]
	}
	return result
}

func goodNodes(root *TreeNode) int {
	maxStack := []int{}
	return traverseFunc(root, maxStack)
}
