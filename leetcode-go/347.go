package main

type FreqHeap struct {
	freqMap map[int]int
	keys    []int
}

func (h *FreqHeap) CreateHeap(freqMap map[int]int) {
	h.keys = []int{}
	h.freqMap = freqMap

	for key := range freqMap {
		h.Add(key)
	}
}

func (h *FreqHeap) Add(key int) {
	h.keys = append(h.keys, key)
	h.HeapifyUp()
}

func (h *FreqHeap) HeapifyUp() {
	index := len(h.keys) - 1
	prev := (index - 1) / 2

	for prev >= 0 && h.freqMap[h.keys[prev]] < h.freqMap[h.keys[index]] {
		h.keys[prev], h.keys[index] = h.keys[index], h.keys[prev]
		index = prev
		prev = (index - 1) / 2
	}
}

func (h *FreqHeap) HeapifyDown() {
	index := 0
	left := index*2 + 1
	right := index*2 + 2
	maxIdx := index

	for index < len(h.keys) {
		if left < len(h.keys) && h.freqMap[h.keys[left]] > h.freqMap[h.keys[maxIdx]] {
			maxIdx = left
		}
		if right < len(h.keys) && h.freqMap[h.keys[right]] > h.freqMap[h.keys[maxIdx]] {
			maxIdx = right
		}

		if maxIdx == index {
			break
		}

		h.keys[index], h.keys[maxIdx] = h.keys[maxIdx], h.keys[index]
		index = maxIdx
		left = index*2 + 1
		right = index*2 + 2
	}
}

func (h *FreqHeap) GetMax() int {
	res := h.keys[0]
	h.keys[0] = h.keys[len(h.keys)-1]
	h.keys = h.keys[:len(h.keys)-1]
	h.HeapifyDown()
	return res
}

func topKFrequent(nums []int, k int) []int {
	freqMap := make(map[int]int)

	for _, num := range nums {
		freqMap[num] = freqMap[num] + 1
	}

	heap := FreqHeap{}
	heap.CreateHeap(freqMap)
	result := []int{}
	for i := 0; i < k; i++ {
		result = append(result, heap.GetMax())
	}
	return result
}

// func main() {
// 	nums := []int{5, 1, -1, -8, -7, 8, -5, 0, 1, 10, 8, 0, -4, 3, -1, -1, 4, -5, 4, -3, 0, 2, 2, 2, 4, -2, -4, 8, -7, -7, 2, -8, 0, -8, 10, 8, -8, -2, -9, 4, -7, 6, 6, -1, 4, 2, 8, -3, 5, -9, -3, 6, -8, -5, 5, 10, 2, -5, -1, -5, 1, -3, 7, 0, 8, -2, -3, -1, -5, 4, 7, -9, 0, 2, 10, 4, 4, -4, -1, -1, 6, -8, -9, -1, 9, -9, 3, 5, 1, 6, -1, -2, 4, 2, 4, -6, 4, 4, 5, -5}
// 	k := 7
// 	fmt.Println(topKFrequent(nums, k))
// }
