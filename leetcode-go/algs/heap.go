package algs

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
