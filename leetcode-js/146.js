/**
 * @param {number} capacity
 */

function NewNode(key, value, next, prev) {
    return { key, value, next, prev };
}

class LRUQueue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    push(node) {
        if (!this.first && !this.last) {
            this.first = node;
            this.last = node;
        }
        else {
            node.next = this.first;
            this.first.prev = node;
            this.first = node;
        }
    }

    pop() {
        let result = this.last.key;
        this.last = this.last.prev;
        if (this.last) {
            this.last.next = null;
        }
        else {
            this.first = null;
        }
        return result;
    }

    remove(node) {
        let prev = node.prev;
        let next = node.next;
        if (!prev && !next) {
            this.first = null;
            this.last = null;
        }
        if (prev && !next) this.last = prev;
        if (!prev && next) this.first = next;

        if (prev) prev.next = next;
        if (next) next.prev = prev;
        node.next = null;
        node.prev = null;
    }
}

var LRUCache = function (capacity) {
    this.keyMap = new Map();
    this.queue = new LRUQueue();
    this.capacity = capacity;
    this.length = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.keyMap.has(key)) return -1;

    let node = this.keyMap.get(key);
    this.queue.remove(node);
    this.queue.push(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    let newNode = NewNode(key, value, null, null);
    if (this.keyMap.has(key)) {
        let removeNode = this.keyMap.get(key);
        this.queue.remove(removeNode);
        this.length--;
    }
    if (this.length === this.capacity) {
        let removeKey = key;
        removeKey = this.queue.pop();
        this.keyMap.delete(removeKey);
        this.length--;
    }
    this.queue.push(newNode);
    this.keyMap.set(key, newNode);
    this.length++;
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
lRUCache = new LRUCache(10);
let operations = [[10, 13], [3, 17], [6, 11], [10, 5], [9, 10], [13], [2, 19], [2], [3], [5, 25], [8], [9, 22], [5, 5], [1, 30], [11], [9, 12], [7], [5], [8], [9], [4, 30], [9, 3], [9], [10], [10], [6, 14], [3, 1], [3], [10, 11], [8], [2, 14], [1], [5], [4], [11, 4], [12, 24], [5, 18], [13], [7, 23], [8], [12], [3, 27], [2, 12], [5], [2, 9], [13, 4], [8, 18], [1, 7], [6], [9, 29], [8, 21], [5], [6, 30], [1, 12], [10], [4, 15], [7, 22], [11, 26], [8, 17], [9, 29], [5], [3, 4], [11, 30], [12], [4, 29], [3], [9], [6], [3, 4], [1], [10], [3, 29], [10, 28], [1, 20], [11, 13], [3], [3, 12], [3, 8], [10, 9], [3, 26], [8], [7], [5], [13, 17], [2, 27], [11, 15], [12], [9, 19], [2, 15], [3, 16], [1], [12, 17], [9, 1], [6, 19], [4], [5], [5], [8, 1], [11, 7], [5, 2], [9, 28], [1], [2, 2], [7, 4], [4, 22], [7, 24], [9, 26], [13, 28], [11, 26]];
for (let operation of operations) {
    let res;
    if (operation.length === 2) {
        res = lRUCache.put(operation[0], operation[1]);
    }
    else res = lRUCache.get(operation[0]);
    console.log(res, operation);
}
