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

    heapifyDown(index) {
        let leftChild = this.leftChild(index);
        let rightChild = this.rightChild(index);
        let maxIdx = index;

        if (
            leftChild < this.heap.length &&
            this.comparator(this.heap[maxIdx], this.heap[leftChild]) > 0
        ) {
            maxIdx = leftChild;
        }
        if (
            rightChild < this.heap.length &&
            this.comparator(this.heap[maxIdx], this.heap[rightChild]) > 0
        ) {
            maxIdx = rightChild;
        }

        if (maxIdx != index) {
            this.swap(maxIdx, index);
            this.heapifyDown(maxIdx);
        }
    }
}

class NewQueue {
    constructor() {
        this.front = null;
        this.back = null;
    }

    isEmpty() {
        return !this.front;
    }

    createNode(value) {
        return {
            value,
            next: null,
        };
    }

    popFront() {
        let result = this.front.value;
        if (this.front === this.back) {
            this.front = null;
            this.back = null;
        } else {
            this.front = this.front.next;
        }
        return result;
    }

    pushBack(value) {
        let node = this.createNode(value);
        if (this.isEmpty()) {
            this.front = node;
            this.back = node;
        } else {
            this.back.next = node;
            this.back = node;
        }
    }

    peek() {
        return this.front.value;
    }
}

var leastInterval = function (tasks, n) {
    let tasksCnt = tasks.reduce((acc, task) => {
        if (task in acc) {
            acc[task]++;
        } else {
            acc[task] = 1;
        }
        return acc;
    }, {});

    let pendingTasks = new TaskHeap((a, b) => {
        return b.taskCnt - a.taskCnt;
    });
    let usedTasks = new NewQueue();

    for (let task in tasksCnt) {
        let taskData = {
            task,
            taskCnt: tasksCnt[task],
            lastUsed: -1,
        };
        pendingTasks.insert(taskData);
    }
    // console.log(pendingTasks.heap);

    let currTime = 0;
    while (!pendingTasks.isEmpty() || !usedTasks.isEmpty()) {
        if (!usedTasks.isEmpty()) {
            let usedTask = usedTasks.peek();
            if (usedTask.lastUsed <= currTime - n - 1) {
                usedTask = usedTasks.popFront();
                pendingTasks.insert(usedTask);
            }
        }
        if (!pendingTasks.isEmpty()) {
            let pendingTask = pendingTasks.peekHead();
            if (
                pendingTask.lastUsed === -1 ||
                pendingTask.lastUsed <= currTime - n - 1
            ) {
                pendingTask = pendingTasks.getHead();
                pendingTask.taskCnt--;
                pendingTask.lastUsed = currTime;
                if (pendingTask.taskCnt > 0) {
                    usedTasks.pushBack(pendingTask);
                }
            }
        }
        currTime++;
    }
    return currTime;
};
