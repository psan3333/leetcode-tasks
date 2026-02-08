package main

func isSameTree(p *TreeNode, q *TreeNode) bool {
	if p == nil && q == nil {
		return true
	}
	if (p == nil && q != nil) || (p != nil && q == nil) || (p != nil && q != nil && p.Val != q.Val) {
		return false
	}
	traversalResult := isSameTree(p.Left, q.Left)
	traversalResult = traversalResult && isSameTree(p.Right, q.Right)
	return traversalResult
}
