package main

type Node struct {
	value int
	index int
	next  *Node
	prev  *Node
}

type Deque struct {
	start  *Node
	end    *Node
	length int
}

func (d *Deque) PushFront(value, index int) {
	node := &Node{
		value: value,
		index: index,
	}
	if d.start == nil {
		d.start = node
		d.end = node
		d.length++
		return
	}
	temp := d.start
	temp.prev = node
	node.next = temp
	d.start = node
	d.length++
}

func (d *Deque) PushBack(value, index int) {
	node := &Node{
		value: value,
		index: index,
	}
	if d.end == nil {
		d.start = node
		d.end = node
		d.length++
		return
	}
	temp := d.end
	temp.next = node
	node.prev = temp
	d.end = node
	d.length++
}

func (d *Deque) PopBack() int {
	value := d.end.value
	if d.start == d.end {
		d.start = nil
		d.end = nil
		d.length = 0
		return value
	}

	d.end = d.end.prev
	d.end.next = nil
	d.length--
	return value
}

func (d *Deque) PopFront() int {
	value := d.start.value
	if d.start == d.end {
		d.start = nil
		d.end = nil
		d.length = 0
		return value
	}

	d.start = d.start.next
	d.start.prev = nil
	d.length--
	return value
}

func (d *Deque) PeekBack() int {
	return d.end.value
}

func (d *Deque) PeekFront() int {
	return d.start.value
}

func maxSlidingWindow(nums []int, k int) []int {
	maximums := []int{}
	deque := Deque{}

	for index, num := range nums {
		for value := deque.PeekBack(); value < num; deque.PopBack() {
		}
		for deque.start.index-index >= k {
			deque.PopFront()
		}

		maximums = append(maximums, deque.PeekFront())
	}

	return maximums
}

// func main() {
// 	nums := []int{1, 3, -1, -3, 5, 3, 6, 7}
// 	k := 3
// 	fmt.Println(maxSlidingWindow(nums, k))
// }
