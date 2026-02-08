class TaskHeap {
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
    }

    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    heapifyUp(index) {
        // if (this.parent(index) >= 0) {
        //     console.log(
        //         this.comparator(
        //             this.heap[index],
        //             this.heap[this.parent(index)],
        //         ),
        //     );
        // }
        while (
            this.parent(index) >= 0 &&
            this.comparator(this.heap[index], this.heap[this.parent(index)]) < 0
        ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    getHead() {
        let result = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return result;
    }

    peekHead() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    getLength() {
        return this.heap.length;
    }

    heapifyDown(index) {
        let leftChild = this.leftChild(index);
        let rightChild = this.rightChild(index);
        let newIdx = index;

        if (
            leftChild < this.heap.length &&
            this.comparator(this.heap[newIdx], this.heap[leftChild]) > 0
        ) {
            newIdx = leftChild;
        }
        if (
            rightChild < this.heap.length &&
            this.comparator(this.heap[newIdx], this.heap[rightChild]) > 0
        ) {
            newIdx = rightChild;
        }

        if (newIdx != index) {
            this.swap(newIdx, index);
            this.heapifyDown(newIdx);
        }
    }
}

var MedianFinder = function () {
    this.leftPart = new TaskHeap((a, b) => b - a);
    this.rightPart = new TaskHeap((a, b) => a - b);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    if (num > this.rightPart.peekHead()) this.rightPart.insert(num);
    else this.leftPart.insert(num);
    while (
        !this.leftPart.isEmpty() &&
        (this.leftPart.peekHead() > this.rightPart.peekHead() ||
            this.leftPart.getLength() > this.rightPart.getLength())
    ) {
        this.rightPart.insert(this.leftPart.getHead());
    }

    while (this.leftPart.getLength() < this.rightPart.getLength()) {
        this.leftPart.insert(this.rightPart.getHead());
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.leftPart.getLength() === this.rightPart.getLength()) {
        return (this.leftPart.peekHead() + this.rightPart.peekHead()) / 2;
    }
    return this.leftPart.peekHead();
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
