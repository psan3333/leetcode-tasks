/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */

class PriorityQueue {
    #heap = [];
    constructor(comp) {
        this.comp = comp;
    }

    get length() {
        return this.#heap.length;
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
        [this.#heap[i1], this.#heap[i2]] = [this.#heap[i2], this.#heap[i1]];
    }

    heapifyUp(index) {
        while (
            this.parent(index) >= 0 &&
            this.comp(this.#heap[this.parent(index)], this.#heap[index]) > 0
        ) {
            this.swap(this.parent(index), index);
            index = this.parent(index);
        }
    }

    heapifyDown(index) {
        let left = this.leftChild(index);
        let right = this.rightChild(index);
        let maxIdx = index;

        if (
            left < this.length &&
            this.comp(this.#heap[maxIdx], this.#heap[left]) > 0
        ) {
            maxIdx = left;
        }
        if (
            right < this.length &&
            this.comp(this.#heap[maxIdx], this.#heap[right]) > 0
        ) {
            maxIdx = right;
        }

        if (index !== maxIdx) {
            this.swap(index, maxIdx);
            this.heapifyDown(maxIdx);
        }
    }

    getHead() {
        let result = this.#heap[0];
        this.swap(0, this.length - 1);
        this.#heap.pop();
        this.heapifyDown(0);
        return result;
    }

    insert(value) {
        this.#heap.push(value);
        this.heapifyUp(this.length - 1);
    }
}

var findCheapestPrice = function (n, flights, src, dst, k) {
    let graph = {};

    for (let i = 0; i < n; i++) {
        graph[i] = {
            city: i,
            next: [],
            price: Infinity,
            stopsTaken: 0,
        };
    }
};

let heap = new PriorityQueue((a, b) => b - a);
for (let i = 0; i < 10; i++) {
    heap.insert(i);
}
for (let i = 0; i < 10; i++) {
    console.log(heap.getHead());
}
