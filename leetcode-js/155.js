
var MinStack = function () {
    this.stack = [];
    this.minVal = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.stack.push(val);
    if (this.minVal.length > 0) {
        this.minVal.push(Math.min(this.getMin(), val));
    }
    else this.minVal.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.stack.pop();
    this.minVal.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minVal[this.minVal.length - 1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

minStack = new MinStack();
minStack.push(0);
minStack.push(1);
minStack.push(0);
console.log(minStack.getMin()); // return -3
minStack.pop();
console.log(minStack.top());    // return 0
console.log(minStack.getMin()); // return -2