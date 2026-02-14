/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

class GraphHeap {
    #heap = [];
    constructor(comp) {
        this.comp = comp;
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
            this.parent(index) > 0 &&
            this.comp(this.#heap[this.parent(index)], this.#heap[index]) > 0
        ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    heapifyDown(index) {
        let left = this.leftChild(index);
        let right = this.rightChild(index);
        let maxIdx = index;

        if (
            left < this.#heap.length &&
            this.comp(this.#heap[left], this.#heap[maxIdx]) > 0
        ) {
            maxIdx = left;
        }
        if (
            right < this.#heap.length &&
            this.comp(this.#heap[right], this.#heap[maxIdx]) > 0
        ) {
            maxIdx = right;
        }

        if (index !== maxIdx) {
            this.swap(index, maxIdx);
            this.heapifyDown(maxIdx);
        }
    }

    insert(item) {
        this.#heap.push(item);
        this.heapifyUp(this.#heap.length - 1);
    }

    getHead() {
        let result = this.#heap[0];
        this.swap(0, this.#heap.length - 1);
        this.#heap.pop();
        this.heapifyDown(0);
        return result;
    }

    get length() {
        return this.#heap.length;
    }
}

function dijkstraSolver(graph, start) {
    let startNode = graph[start];
    startNode.dist = 0;

    let comparator = (a, b) => a.dist - b.dist;
    let queue = new GraphHeap(comparator);
    queue.insert(startNode);
    while (queue.length > 0) {
        let item = queue.getHead();
        for (let [to, weight] of item.next) {
            if (graph[to].dist > graph[item.value].dist + weight) {
                graph[to].dist = graph[item.value].dist + weight;
                queue.insert(graph[to]);
            }
        }
    }

    let result = 0;
    for (let node in graph) {
        result = Math.max(result, graph[node].dist);
    }

    return result === Infinity ? -1 : result;
}

var networkDelayTime = function (times, n, k) {
    let graph = {};
    for (let i = 1; i <= n; i++) {
        graph[i] = {
            value: i,
            next: [],
            dist: Infinity,
        };
    }
    for (let edge of times) {
        let [from, to, weight] = edge;
        graph[from].next.push([to, weight]);
    }

    return dijkstraSolver(graph, k);
};

let times = [
        [2, 1, 1],
        [2, 3, 2],
        [3, 4, 1],
    ],
    n = 4,
    k = 2;
console.log(networkDelayTime(times, n, k));
