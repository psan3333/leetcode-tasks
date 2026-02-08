/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.circularQueue = new Array(k);
    this.frontIdx = 0;
    this.backIdx = 0;
    this.queueLength = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.isFull()) return false;
    if (this.queueLength != 0) {
        this.backIdx = (this.backIdx + 1) % this.circularQueue.length;
    }
    this.circularQueue[this.backIdx] = value;
    this.queueLength++;
    return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
    if (this.isEmpty()) return false;
    if (this.frontIdx != this.backIdx) {
        this.frontIdx = (this.frontIdx + 1) % this.circularQueue.length;
    }
    this.queueLength--;
    return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
    if (this.isEmpty()) return -1;
    return this.circularQueue[this.frontIdx];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
    if (this.isEmpty()) return -1;
    return this.circularQueue[this.backIdx];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
    return this.queueLength === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
    return this.queueLength === this.circularQueue.length;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
