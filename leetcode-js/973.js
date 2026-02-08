/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */

class MinHeapDist {
    constructor() {
        this.heap = [];
    }

    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    getMin() {
        let result = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return result;
    }

    heapifyUp(index) {
        while (
            this.parent(index) >= 0 &&
            this.heap[index].dist < this.heap[this.parent(index)].dist
        ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    heapifyDown(index) {
        let left = this.leftChild(index);
        let right = this.rightChild(index);
        let minIdx = index;

        if (
            left < this.heap.length &&
            this.heap[left].dist < this.heap[minIdx].dist
        ) {
            minIdx = left;
        }
        if (
            right < this.heap.length &&
            this.heap[right].dist < this.heap[minIdx].dist
        ) {
            minIdx = right;
        }

        if (minIdx !== index) {
            this.swap(minIdx, index);
            this.heapifyDown(minIdx);
        }
    }
}

function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

var kClosest = function (points, k) {
    let distances = [];
    for (let point of points) {
        let newPoint = {
            point: point,
            dist: distance([0, 0], point),
        };
        distances.push(newPoint);
    }

    let heap = new MinHeapDist();
    for (let dist of distances) {
        heap.insert(dist);
    }

    let result = [];
    for (let i = 0; i < k; i++) {
        result.push(heap.getMin().point);
    }

    return result;
};
