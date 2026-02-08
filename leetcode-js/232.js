// very stupid question, but:

/*

The basic concept behind this task is
that we can reverse stack by popping every element from first stack to another stack
- first element in first stack will be on top of 
another stack if we do that.
- After popping top of the second stack, we than do nothing.
- If second stack becomes empty, we again fill it with 
first stack values and make first stack empty

IMPLEMENTATION IS BELOW
     |
     |
    \ /
*/

var MyQueue = function () {
    this.stack = [];
    this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.stack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    if (this.stack2.length === 0) {
        while (this.stack.length > 0) {
            this.stack2.push(this.stack.pop());
        }
    }
    return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    if (this.stack2.length === 0) {
        while (this.stack.length > 0) {
            this.stack2.push(this.stack.pop());
        }
    }
    return this.stack2[this.stack2.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.stack.length === 0 && this.stack2.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
