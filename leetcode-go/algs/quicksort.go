package algs

// REQUIRES CORRECTION

func swap[T any](arr []T, idx1, idx2 int) {
	if idx1 >= len(arr) || idx1 < 0 || idx2 >= len(arr) || idx2 < 0 {
		return
	}
	arr[idx1], arr[idx2] = arr[idx2], arr[idx1]
}

func partition[T comparable](nums []T, comparator func(a, b T) int, left, right int) int {
	pivot := nums[right]
	left -= 1
	right += 1

	for {
		left++
		right--
		for comparator(nums[left], pivot) < 0 {
			left++
		}
		for comparator(nums[right], pivot) > 0 {
			right--
		}

		if left >= right {
			return right
		}
		swap(nums, left, right)
	}
}

func quicksort[T comparable](nums []T, comparator func(a, b T) int, left, right int) {
	if right-left == 1 {
		if comparator(nums[left], nums[right]) > 0 {
			swap(nums, left, right)
		}
	} else if left >= 0 && right >= 0 && left < right {
		partitionIdx := partition(nums, comparator, left, right)
		quicksort(nums, comparator, left, partitionIdx)
		quicksort(nums, comparator, partitionIdx+1, right)
	}

}

func Quicksort[T comparable](nums []T, comparator func(a, b T) int) {
	quicksort(nums, comparator, 0, len(nums)-1)
}
