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
func findFurthestPath(root *TreeNode, maxPath *int) int {
	if root == nil {
		// nothing
		return 0
	}
	if root.Left == nil && root.Right == nil {
		// Leaf
		return 1
	}
	furthestPathLeft := findFurthestPath(root.Left, maxPath)
	furthestPathRight := findFurthestPath(root.Right, maxPath)
	if furthestPathLeft+furthestPathRight > *maxPath {
		*maxPath = furthestPathLeft + furthestPathRight
	}
	return int(math.Max(float64(furthestPathLeft), float64(furthestPathRight))) + 1
}

func diameterOfBinaryTree(root *TreeNode) int {
	maxPath := 0
	findFurthestPath(root, &maxPath)
	return maxPath
}
