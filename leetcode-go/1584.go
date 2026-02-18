package main

import (
	"fmt"
	"math"
)

type KruskalHeap[T any] struct {
	heap       []*T
	comparator func(a, b *T) int
}

func parent(idx int) int {
	return (idx - 1) / 2
}

func leftChild(idx int) int {
	return 2*idx + 1
}

func rightChild(idx int) int {
	return 2*idx + 2
}

func (h *KruskalHeap[T]) swap(i1, i2 int) {
	h.heap[i1], h.heap[i2] = h.heap[i2], h.heap[i1]
}

func (h *KruskalHeap[T]) insert(value *T) {
	h.heap = append(h.heap, value)
	h.heapifyUp(len(h.heap) - 1)
}

func (h *KruskalHeap[T]) getHead() *T {
	result := h.heap[0]
	h.swap(0, len(h.heap)-1)
	h.heap = h.heap[:len(h.heap)-1]
	h.heapifyDown(0)
	return result
}

func (h *KruskalHeap[T]) heapifyUp(index int) {
	for parent(index) >= 0 && h.comparator(h.heap[parent(index)], h.heap[index]) > 0 {
		h.swap(index, parent(index))
		index = parent(index)
	}
}

func (h *KruskalHeap[T]) heapifyDown(index int) {
	left := leftChild(index)
	right := rightChild(index)
	newIdx := index

	if left < len(h.heap) && h.comparator(h.heap[newIdx], h.heap[left]) > 0 {
		newIdx = left
	}
	if right < len(h.heap) && h.comparator(h.heap[newIdx], h.heap[right]) > 0 {
		newIdx = right
	}

	if newIdx != index {
		h.swap(newIdx, index)
		h.heapifyDown(newIdx)
	}
}

type DisjointSet struct {
	arr []int // init with -1 for each item
}

func (ds *DisjointSet) parent(value int) int {
	// Collapsing find - while finding value, we can collapse each set so
	// each item has parent in root node of the set
	toCollapse := []int{}
	for ds.arr[value] >= 0 {
		toCollapse = append(toCollapse, value)
		value = ds.arr[value]
	}
	for _, val := range toCollapse {
		ds.arr[val] = value
	}
	return value
}

func (ds *DisjointSet) merge(set1, set2 int) {
	if ds.arr[set2] < ds.arr[set1] {
		set1, set2 = set2, set1
	}
	ds.arr[set1] += ds.arr[set2]
	ds.arr[set2] = set1
}

func (ds *DisjointSet) formsCycle(edge *Edge) bool {
	startParent := ds.parent(edge.start)
	endParent := ds.parent(edge.end)
	return startParent == endParent
}

func (ds *DisjointSet) insertEdge(edge *Edge) {
	startParent := ds.parent(edge.start)
	endParent := ds.parent(edge.end)
	if startParent == endParent {
		return
	}
	ds.merge(startParent, endParent)
}

type Edge struct {
	start int
	end   int
	dist  int
}

func manhattan(p1, p2 []int) int {
	return int(math.Abs(float64(p1[0]-p2[0])) + math.Abs(float64(p1[1]-p2[1])))
}

func minCostConnectPoints(points [][]int) int {
	comp := func(a, b *Edge) int {
		return a.dist - b.dist
	}
	edges := KruskalHeap[Edge]{
		heap:       []*Edge{},
		comparator: comp,
	}
	for i := 0; i < len(points)-1; i++ {
		for j := 0; j < len(points); j++ {
			if i == j {
				continue
			}
			dist := manhattan(points[i], points[j])
			ijEdge := &Edge{
				start: i,
				end:   j,
				dist:  dist,
			}
			edges.insert(ijEdge)
		}
	}
	result := 0
	dsuItems := make([]int, len(points))
	for i := 0; i < len(points); i++ {
		dsuItems[i] = -1
	}
	disjointSet := DisjointSet{
		arr: dsuItems,
	}
	edgesCnt := 0
	for edgesCnt < len(points)-1 {
		minEdge := edges.getHead()
		if disjointSet.formsCycle(minEdge) {
			continue
		}

		disjointSet.insertEdge(minEdge)
		result += minEdge.dist
		edgesCnt++
	}

	return result
}

func main() {
	points := [][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}}
	fmt.Println(minCostConnectPoints((points)))
}
