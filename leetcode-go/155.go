package main

import "math"

type MinStack struct {
	Values        []int
	MinValueTrack []int
}

// func Constructor() MinStack {
// 	return MinStack{
// 		Values:        []int{},
// 		MinValueTrack: []int{},
// 	}
// }

func (this *MinStack) Push(val int) {
	this.Values = append(this.Values, val)
	minValue := val
	if len(this.MinValueTrack) > 0 {
		minValue = int(math.Min(float64(this.MinValueTrack[len(this.MinValueTrack)-1]), float64(val)))
	}
	this.MinValueTrack = append(this.MinValueTrack, minValue)
}

func (this *MinStack) Pop() {
	if len(this.Values) > 0 {
		this.Values = this.Values[:len(this.Values)-1]
		this.MinValueTrack = this.MinValueTrack[:len(this.MinValueTrack)-1]
	}
}

func (this *MinStack) Top() int {
	return this.Values[len(this.Values)-1]
}

func (this *MinStack) GetMin() int {
	return this.MinValueTrack[len(this.MinValueTrack)-1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(val);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
