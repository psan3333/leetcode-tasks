package main

/**
 * Definition for a binary tree node.
 *
 */

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func searchAncestor(root, p, q *TreeNode, ancestorFound *bool) *TreeNode {
	if root == nil || *ancestorFound {
		return nil
	}
	foundNode := false
	if root == p || root == q {
		foundNode = true
	}
	inLeft := searchAncestor(root.Left, p, q, ancestorFound)
	inRight := searchAncestor(root.Right, p, q, ancestorFound)
	checkIfCommonAncestor := (foundNode && (inLeft != nil || inRight != nil)) || (inLeft != nil && inRight != nil)
	if !(*ancestorFound) && checkIfCommonAncestor {
		*ancestorFound = true
		return root
	}
	if foundNode {
		return root
	}
	if inLeft != nil {
		return inLeft
	}
	if inRight != nil {
		return inRight
	}
	return nil
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	ancestorFound := false
	ancestor := searchAncestor(root, p, q, &ancestorFound)
	// fmt.Println(ancestor)
	return ancestor
}
