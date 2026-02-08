package main

func merge(nums1 []int, m int, nums2 []int, n int) {
	firstIdx := m - 1
	secondIdx := n - 1

	for secondIdx >= 0 && firstIdx >= 0 {
		if nums1[firstIdx] < nums2[secondIdx] {
			nums1[firstIdx+secondIdx+1] = nums2[secondIdx]
			secondIdx--
		} else {
			nums1[firstIdx+secondIdx+1] = nums1[firstIdx]
			firstIdx--
		}
	}
	if firstIdx < 0 {
		for secondIdx >= 0 {
			nums1[secondIdx] = nums2[secondIdx]
			secondIdx--
		}
	}
}
