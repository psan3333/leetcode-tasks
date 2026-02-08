
function Node(value, next, prev) {
    return { value, next, prev };
}

class Deque {
    constructor(size) {
        this.front = null;
        this.end = null;
        this.maxSize = size;
        this.length = 0;
    }

    isEmpty() {
        return !this.front;
    }

    peek() {
        return this.front.value;
    }

    back() {
        return this.end.value;
    }

    popFront() {
        const frontValue = this.front.value;
        if (this.length === 1) {
            this.front = null;
            this.end = null;
        }
        else {
            this.front = this.front.next;
            this.front.prev = null;
        }
        this.length--;
        return frontValue;
    }

    popBack() {
        const backValue = this.end.value;
        if (this.length === 1) {
            this.front = null;
            this.end = null;
        }
        else {
            this.end = this.end.prev;
            this.end.next = null;
        }
        this.length--;
        return backValue;
    }

    pushBack(value) {
        if (this.length === this.maxSize) {
            return;
        }

        let node = Node(value, null, null);
        if (this.length === 0) {
            this.front = node;
            this.end = node;
        }
        else {
            node.prev = this.end;
            this.end.next = node;
            this.end = node;
        }
        this.length++;
    }

    pushFront(value) {
        if (this.length === this.maxSize) {
            return;
        }
        let node = Node(value, null, null);
        if (this.length === 0) {
            this.front = node;
            this.end = node;
        }
        else {
            node.next = this.front;
            this.front.prev = node;
            this.front = node;
        }
        this.length++;
    }
}

var maxSlidingWindow = function (nums, k) {
    if (nums.length < k) return [];
    let deq = new Deque(k); // deque with indexes
    let result = [];

    for (let i = 0; i < nums.length; i++) {
        while (!deq.isEmpty() && deq.peek() <= i - k) deq.popFront();

        while (!deq.isEmpty() && nums[deq.back()] <= nums[i]) deq.popBack();

        deq.pushBack(i);

        if (i - k + 1 >= 0) {
            result.push(nums[deq.peek()]);
        }
    }

    return result;
};

let nums = [1, 3, -1, -3, 5, 3, 6, 7];
let k = 3
console.log(maxSlidingWindow(nums, k));