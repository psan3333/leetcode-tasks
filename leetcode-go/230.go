package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func findKthSmallest(root *TreeNode, k int, trackSmallest *int) int {
	if root.Left != nil {
		leftTraverse := findKthSmallest(root.Left, k, trackSmallest)
		if *trackSmallest == k {
			return leftTraverse
		}
	}
	*trackSmallest += 1
	if *trackSmallest == k {
		return root.Val
	}
	if root.Right != nil {
		rightTraverse := findKthSmallest(root.Right, k, trackSmallest)
		if *trackSmallest == k {
			return rightTraverse
		}
	}
	return 0
}

func kthSmallest(root *TreeNode, k int) int {
	trackSmallest := 0
	return findKthSmallest(root, k, &trackSmallest)
}
