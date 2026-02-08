
class Heap {
    constructor(arr) {
        this.heap = arr;
        this.buildHeap(arr);
    }

    buildHeap() {
        for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }

    heapify(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let max = index;

        while (true) {
            if (left < this.heap.length && this.heap[max][1] < this.heap[left][1]) {
                max = left;
            }
            if (right < this.heap.length && this.heap[max][1] < this.heap[right][1]) {
                max = right;
            }
            if (max === index) break;

            [this.heap[max], this.heap[index]] = [[...this.heap[index]], [...this.heap[max]]];
            max = index;
        }
    }

    getMax() {
        let max = this.heap[0][0];
        this.heap[0] = [...this.heap[this.heap.length - 1]];
        this.heap.length = this.heap.length - 1;
        this.buildHeap();
        return max;
    }
}

function topKFrequent(nums, k) {
    let map = new Map();

    nums.forEach(num => {
        if (map.has(num)) {
            map.set(num, map.get(num) + 1);
        }
        else map.set(num, 1);
    });

    let heap = new Heap(Array.from(map.entries()));

    let result = [];

    for (let i = 0; i < k; i++) {
        result.push(heap.getMax());
    }

    return result;
}

let nums = [1];

console.log(topKFrequent(nums, 1));