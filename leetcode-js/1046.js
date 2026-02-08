/**
 * @param {number[]} stones
 * @return {number}
 */

class MaxHeapTask {
    length = 0;

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

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
        this.length++;
    }

    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    heapifyUp(index) {
        while (
            this.parent(index) >= 0 &&
            this.heap[index] > this.heap[this.parent(index)]
        ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    getMax() {
        let result = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        this.length--;
        return result;
    }

    heapifyDown(index) {
        let leftChild = this.leftChild(index);
        let rightChild = this.rightChild(index);
        let maxIdx = index;

        if (
            leftChild < this.heap.length &&
            this.heap[leftChild] > this.heap[maxIdx]
        ) {
            maxIdx = leftChild;
        }
        if (
            rightChild < this.heap.length &&
            this.heap[rightChild] > this.heap[maxIdx]
        ) {
            maxIdx = rightChild;
        }

        if (maxIdx != index) {
            this.swap(maxIdx, index);
            this.heapifyDown(maxIdx);
        }
    }
}

var lastStoneWeight = function (stones) {
    if (stones.length <= 1) return stones[0];
    let heap = new MaxHeapTask();

    for (let stone of stones) {
        heap.insert(stone);
    }

    let y = heap.getMax(),
        x = heap.getMax();

    while (true) {
        if (x !== y) {
            y = y - x;
            heap.insert(y);
        }

        x = 0;
        y = 0;
        if (heap.length === 0) {
            break;
        }
        y = heap.getMax();
        if (heap.length === 0) {
            break;
        }
        x = heap.getMax();
    }

    return y;
};

let stones = [7, 6, 7, 6, 9];
console.log(lastStoneWeight(stones));
