class MinHeapTask {
    length = 0;

    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
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
            this.heap[index] < this.heap[this.parent(index)]
        ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    getMin() {
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
            this.heap[leftChild] < this.heap[maxIdx]
        ) {
            maxIdx = leftChild;
        }
        if (
            rightChild < this.heap.length &&
            this.heap[rightChild] < this.heap[maxIdx]
        ) {
            maxIdx = rightChild;
        }

        if (maxIdx != index) {
            this.swap(maxIdx, index);
            this.heapifyDown(maxIdx);
        }
    }
}

var KthLargest = function (k, nums) {
    this.heap = new MinHeapTask();
    this.k = k;

    for (let num of nums) {
        if (this.heap.heap.length < k) {
            this.heap.insert(num);
        } else if (
            this.heap.heap.length === this.k &&
            this.heap.heap[0] < num
        ) {
            this.heap.getMin();
            this.heap.insert(num);
        }
    }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    if (this.heap.heap.length < this.k) {
        this.heap.insert(val);
    } else if (this.heap.heap.length === this.k && this.heap.heap[0] < val) {
        this.heap.getMin();
        this.heap.insert(val);
    }
    return this.heap.heap[0];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
