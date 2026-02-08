function binSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let index = Math.floor((left + right) / 2);

    while (left <= right) {
        if (arr[index] === target) return index;
        if (arr[index] < target) left = index + 1;
        if (arr[index] > target) right = index - 1;
        index = Math.floor((left + right) / 2);
    }
    return -1;
}

// dfs, по сути
function findTheKey(box) {
    for (let item in box) {
        if (item === "key") {
            console.log(`The key is in the box! The key is ${box[item]}`);
            return
        }
        else if (typeof box[item] === "object") {
            findTheKey({ ...box[item] });
        }
    }
}

function sum(arr) {
    if (arr.length === 1) {
        return arr[0];
    }
    return arr[0] + sum(arr.slice(1));
}

function quicksort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    if (arr.length === 2) {
        return arr[0] > arr[1] ? [arr[1], arr[0]] : arr;
    }
    let pivot_idx = Math.floor(Math.random() * arr.length);
    let right_part = arr.filter((element) => element > arr[pivot_idx]);
    let left_part = arr.filter((element) => element <= arr[pivot_idx]);
    return [...quicksort(left_part), arr[pivot_idx], ...quicksort(right_part)];
}

// jenkins hash
function jenkins(key) {
    let i = 0;
    let hash = 0;
    while (i != key.length) {
        hash += key[i++].charCodeAt();
        hash += hash << 10;
        hash ^= hash >> 6;
    }
    hash += hash << 3;
    hash ^= hash >> 11;
    hash += hash << 15;
    return hash;
}

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.isEmpty() ? "Queue is empty" : this.items.shift();
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        console.log(this.items.join(" -> "));
    }
}

function bfs_shortest_path(graph, start_node) {
    let graph = {
        "cab": { edges: ["cat", "car"] },
        "cat": { edges: ["mat", "bat"] },
        "car": { edges: ["cat", "bar"] },
        "mat": { edges: ["bat"] },
        "bar": { edges: ["bat"] },
        "bat": { edges: [] }
    }
    let edges_count = 0;
    for (let idx in graph) {
        edges_count += graph[idx]["edges"].length
    }
    for (let idx in graph) {
        graph[idx]["dist"] = edges_count;
        graph[idx]["visited"] = false;
    }
    let queue = new Queue();
    graph[start_node]["visited"] = true;
    graph[start_node]["dist"] = 0;
    queue.enqueue(start_node);
    while (!queue.isEmpty()) {
        let curr_idx = queue.dequeue();
        console.log(curr_idx);
        let node = graph[curr_idx];
        for (let idx in node["edges"]) {
            node_idx = node["edges"][idx];
            if (graph[node_idx]["visited"] && (node["dist"] + 1 < graph[node_idx]["dist"])) {
                graph[node_idx]["dist"] = node["dist"] + 1;
                queue.enqueue(node_idx);
            }
            else if (!graph[node_idx]["visited"]) {
                graph[node_idx]["dist"] = node["dist"] + 1;
                queue.enqueue(node_idx);
            }
            graph[node_idx]["visited"] = true;
        }
    }
    return graph;
}

// Тасование Фишера-Йетса
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// fast anagram cleaning
function aclean(arr) {
    let anagram_filter = {};
    let result = [];
    for (let str of arr) {
        let new_str = str.toLowerCase();
        let sum = 0;
        let prod = 1;
        for (let char of new_str) {
            let charcode = char.charCodeAt(0);
            sum += charcode;
            prod *= charcode;
        }
        if (anagram_filter[sum] !== prod) {
            result.push(new_str);
            anagram_filter[sum] = prod;
        }
    }
    return result;
}

// backpack task
function best_backpack(items, capacity) {

    // let backpack_items = {
    //     "water": {
    //         weight: 3,
    //         value: 10,
    //         name: "water"
    //     },
    //     "book": {
    //         weight: 1,
    //         value: 3,
    //         name: "book"
    //     },
    //     "food": {
    //         weight: 2,
    //         value: 9,
    //         name: "food"
    //     },
    //     "jacket": {
    //         weight: 2,
    //         value: 5,
    //         name: "jacket"
    //     },
    //     "camera": {
    //         weight: 1,
    //         value: 6,
    //         name: "camera"
    //     },
    // }
    // let backpack_capacity = 6;

    let item_names = Object.keys(items);
    let num_items = item_names.length;
    let weight_step = item_names.reduce((acc, item_name) => items[item_name].weight < acc ? items[item_name].weight : acc, items["water"].weight);
    let backpack_weight_steps = Array.from(
        { length: (capacity - weight_step) / weight_step + 1 },
        (value, index) => weight_step + index * weight_step
    );
    let num_columns = backpack_weight_steps.length;
    let backpack_table = item_names.reduce((acc, item_name, index) => {
        let arr = Array(num_columns).keys();
        // console.log(arr.length);
        let res = arr.reduce((arr_acc) => {
            let backpack = {
                value: 0,
                curr_items: []
            };
            return [...arr_acc, backpack];
        }, []);
        // console.log(res);
        return [...acc, res];
    }, []);
    for (let i = 0; i < num_items; i++) {
        let curr_item = items[item_names[i]];
        for (let j = 0; j < num_columns; j++) {
            let remaining_capacity = backpack_weight_steps[j] - curr_item.weight;
            if (i == 0) {
                if (remaining_capacity < 0) {
                    backpack_table[i][j].value = 0;
                    backpack_table[i][j].curr_items = [];
                }
                else {
                    backpack_table[i][j].value = curr_item.value;
                    backpack_table[i][j].curr_items = [curr_item];
                }
                console.log(backpack_table[i]);
            }
            else {
                let rem_cap_index = Math.floor(remaining_capacity / weight_step) - 1;
                if (remaining_capacity === 0 && (backpack_table[i - 1][j].value < curr_item.value)) {
                    backpack_table[i][j].value = curr_item.value;
                    backpack_table[i][j].curr_items = [curr_item];
                }
                else if (rem_cap_index >= 0 && (backpack_table[i - 1][j].value < curr_item.value + backpack_table[i - 1][rem_cap_index].value)) {
                    backpack_table[i][j].value = curr_item.value + backpack_table[i - 1][rem_cap_index].value;
                    backpack_table[i][j].curr_items = [...backpack_table[i - 1][rem_cap_index].curr_items, curr_item];
                }
                else {
                    let found = false;

                    backpack_table[i][j].value = backpack_table[i - 1][j].value;
                    backpack_table[i][j].curr_items = backpack_table[i - 1][j].curr_items;
                }
            }
        }
    }
    return backpack_table[num_items - 1][num_columns - 1];
}

function biggest_substring(str1, str2) {
    let table = Array.from(str1).reduce((whole_table, char1, index1) => {
        let row = Array.from(str2).reduce((table_row, char2, index2) => {
            table_row[index2] = {
                len: 0,
                substr: ""
            };
            return table_row;
        }, {})
        whole_table[index1] = row;
        return whole_table;
    }, {});
    // console.log(table);
    let max_len = {
        len: 0,
        substr: ""
    };
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j]) {
                table[i][j].len = i == 0 || j == 0 ? 1 : table[i - 1][j - 1].len + 1;
                table[i][j].substr = i == 0 || j == 0 ? str1[i] : table[i - 1][j - 1].substr + str1[i];
            }
            else {
                table[i][j].len = 0;
                table[i][j].substr = "";
            }
            if (table[i][j].len > max_len.len) {
                max_len = table[i][j];
            }
        }
    }
    return max_len.substr;
}

function insertionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        while (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            i--;
            if (i < 0) {
                break;
            }
        }
    }
    return arr;
}

function radixSort(arr, base) {
    // you can enter whatever base you want, but lower than the numbers in array
    let buckets = Array(base).fill([]).reduce((acc, _) => [...acc, []], []);
    let exp = 1;
    let max_val = Math.max(...arr);
    while (Math.floor(max_val / exp) > 0) {
        while (arr.length > 0) {
            let num = arr.splice(0, 1)[0];
            let idx = (Math.floor(num / exp) % base);
            buckets[idx].push(num);
        }

        for (let bucket of buckets) {
            while (bucket.length > 0) {
                let num = bucket.splice(0, 1)[0];
                arr.push(num);
            }
        }
        exp *= base;
    }
    return arr;
}

// merge sort
function merge(arr1, arr2) {
    let res = [];
    let idx1 = 0;
    let idx2 = 0;
    while (idx1 < arr1.length || idx2 < arr2.length) {
        if (idx1 < arr1.length && idx2 < arr2.length && arr1[idx1] < arr2[idx2]) {
            res.push(arr1[idx1]);
            idx1++;
        }
        else if (idx2 < arr2.length) {
            res.push(arr2[idx2]);
            idx2++;
        }
        else {
            res.push(arr1[idx1]);
            idx1++;
        }
    }
    return res;
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    if (arr.length === 2) {
        return arr[0] < arr[1] ? [arr[0], arr[1]] : [arr[1], arr[0]];
    }
    let arr_center = Math.floor(arr.length / 2);
    let res = merge(mergeSort(arr.slice(0, arr_center)), mergeSort(arr.slice(arr_center)));
    console.log(res);
    return res;
}

// каррирование функции
function curry(func) {
    return function curried(...args) {
        if (func.length < args.length) {
            return func.apply(this, args);
        }
        else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

// AVL Tree on Javascript
{
    class AVLTree {
        constructor() {
            this.root = null;
        }

        createNode(value, depth = 0, cnt = 1, left = null, right = null) {
            return { value, depth, cnt, left, right };
        }

        __insertNode(valueNode, node = this.root) {
            if (node === null) {
                node = valueNode;
                return node;
            }
            else {
                if (node.value === valueNode.value) {
                    node.cnt += 1;
                    return node;
                }
                else if (node.value < valueNode.value) {
                    node.right = this.__insertNode(valueNode, node.right);
                }
                else if (node.value > valueNode.value) {
                    node.left = this.__insertNode(valueNode, node.left);
                }
                return this.balanceNode(this.calcDepth(node));
            }
        }

        __removeValue(value, node = this.root) {
            if (node === null) {
                return null;
            }
            else {
                if (node.value === value) {
                    if (node.cnt > 1) {
                        node.cnt -= 1;
                        return node;
                    }
                    else {
                        let left = node.left;
                        let right = node.right;
                        if (!left && !right) return null;
                        else if (!left && right) return right;
                        else if (!right && left) return left;
                        else {
                            if (left.depth > right.depth) {
                                node = left;
                                node = this.__insertNode(right, node);
                                node.left = this.balanceNode(this.calcDepth(node.left));
                            }
                            else {
                                node = right;
                                node = this.__insertNode(left, node);
                                node.right = this.balanceNode(this.calcDepth(node.right));
                                // console.log(node.right);
                            }
                        }
                    }
                }
                else if (node.value < value) {
                    node.right = this.__removeValue(value, node.right);
                }
                else if (node.value > value) {
                    node.left = this.__removeValue(value, node.left);
                }
            }
            return this.balanceNode(this.calcDepth(node));
        }

        insert(value) {
            let valueNode = this.createNode(value);
            this.root = this.__insertNode(valueNode);
        }

        remove(value) {
            this.root = this.__removeValue(value);
        }

        calcBalance(node) {
            let leftDepth = node?.left ? node.left.depth + 1 : 0;
            let rightDepth = node?.right ? node.right.depth + 1 : 0;
            return leftDepth - rightDepth;
        }

        calcDepth(node) {
            if (!node) return node;
            if (!node?.left && !node?.right) {
                node.depth = 0;
            }
            else node.depth = Math.max((node.left?.depth || 0), (node.right?.depth || 0)) + 1;
            return node;
        }

        balanceNode(node) {
            let balance = this.calcBalance(node);
            // console.log(balance, node.left, node.right);
            if (balance > 1) {
                let childBalance = this.calcBalance(node.left);
                if (childBalance === -1) node.left = this.rotateRight(node.left);
                node = this.rotateLeft(node);
                // this.printTree(node);
            }
            else if (balance < -1) {
                let childBalance = this.calcBalance(node.right);
                if (childBalance === 1) node.right = this.rotateLeft(node.right);
                node = this.rotateRight(node);
                // this.printTree(node);
            }
            return node;
        }

        rotateRight(node) {
            let rightNode = node.right;
            let leftChild = rightNode.left;
            node.right = leftChild;
            rightNode.left = node;
            node = this.calcDepth(node);
            rightNode = this.calcDepth(rightNode);
            return rightNode;
        }

        rotateLeft(node) {
            let leftNode = node.left;
            let rightChild = leftNode.right;
            node.left = rightChild;
            leftNode.right = node;
            node = this.calcDepth(node);
            leftNode = this.calcDepth(leftNode);
            return leftNode;
        }

        printTree(node) {
            let arr = [node];
            let newArr = [];

            while (arr.length > 0) {
                let output = '';

                for (let node of arr) output += `${node.value} `;
                console.log(output);
                for (let node of arr) {
                    if (node.left !== null) newArr.push(node.left);
                    if (node.right !== null) newArr.push(node.right);
                }
                arr = newArr;
                newArr = [];
            }
        }

        getMax(node = this.root) {
            while (node.right) {
                node = node.right;
            }
            return node.value;
        }
    }
}

{
    // simple implementation of heap
    class MaxHeap {
        constructor(items = []) {
            this.items = items;
            this.buildHeap();
        }

        buildHeap() {
            for (let i = Math.floor(this.items.length / 2); i >= 0; i--) {
                this.heapifyDown(i);
            }
        }

        heapifyUp(index) {
            let parent = Math.floor((index - 1) / 2);
            while (this.items[parent] < this.items[index] && index > 0) {
                [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
                index = parent;
                parent = Math.floor((index - 1) / 2);
            }
        }

        heapifyDown(index) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let max = index;
            while (left < this.items.length || right < this.items.length) {
                if (left < this.items.length && this.items[left] > this.items[max]) max = left;
                if (right < this.items.length && this.items[right] > this.items[max]) max = right;
                if (index === max) break;

                [this.items[index], this.items[max]] = [this.items[max], this.items[index]];
                index = max;
                left = 2 * index + 1;
                right = 2 * index + 2;
            }
        }

        insert(value) {
            this.items.push(value);
            this.heapifyUp(this.items.length - 1);
        }

        getMax() {
            let max = this.items[0];
            [this.items[0], this.items[this.items.length - 1]] = [this.items[this.items.length - 1], this.items[0]];
            this.items.length = this.items.length - 1;
            this.heapifyDown(0);
            return max;
        }

        heapsort() {
            // written to check heap correctness
            let res = [];
            let heapCopy = [...this.items];

            while (this.items.length > 0) {
                res.push(this.getMax());
            }

            this.items = heapCopy;
            return res.reverse();
        }
    }
}

{

    // Floyd-Warshall algorithm for shortest path between each pair of graph nodes
    function floydWarshall(graph) {
        let matrix = [];
        matrix.length = graph.length;
        matrix.fill(Infinity);
        matrix = matrix.map(_ => {
            let row = [];
            row.length = graph.length;
            row.fill(Infinity);
            return row;
        });


        for (let i = 1; i <= graph.length; i++) {
            let from = i;
            matrix[i - 1][i - 1] = 0;
            for (let edge of graph[i].edges) {
                let to = edge.to;
                matrix[from - 1][to - 1] = edge.weight;
            }
        }
        // console.log(matrix);

        for (let i = 1; i <= graph.length; i++) {
            for (let j = 1; j <= graph.length; j++) {
                for (let k = 1; k <= graph.length; k++) {
                    if (matrix[j - 1][k - 1] > matrix[j - 1][i - 1] + matrix[i - 1][k - 1]) {
                        matrix[j - 1][k - 1] = matrix[j - 1][i - 1] + matrix[i - 1][k - 1];
                    }
                }
            }
        }

        return matrix;
    }


    let graph = {
        1: {
            edges: [
                {
                    to: 2,
                    weight: 3
                },
                {
                    to: 4,
                    weight: 7
                },
            ]
        },
        2: {
            edges: [
                {
                    to: 1,
                    weight: 8
                },
                {
                    to: 3,
                    weight: 2
                },
            ]
        },
        3: {
            edges: [
                {
                    to: 1,
                    weight: 5
                },
                {
                    to: 4,
                    weight: 1
                },
            ]
        },
        4: {
            edges: [
                {
                    to: 1,
                    weight: 2
                },
            ]
        },
        length: 4
    };

    console.log(floydWarshall(graph));
}

{
    // MinStack Data structure

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
}

{
    // Deque with linked lists
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
}

{
    // TimeMap - time based key-value store
    var TimeMap = function () {
        this.timeMap = new Map();
    };

    /** 
     * @param {string} key 
     * @param {string} value 
     * @param {number} timestamp
     * @return {void}
     */
    TimeMap.prototype.set = function (key, value, timestamp) {
        let timestamps = [];
        if (this.timeMap.has(key)) {
            timestamps = this.timeMap.get(key);
        }
        timestamps.push([timestamp, value]);
        this.timeMap.set(key, timestamps);
        // console.log("Set: ", key, value, timestamps);
    };

    /** 
     * @param {string} key 
     * @param {number} timestamp
     * @return {string}
     */
    TimeMap.prototype.get = function (key, timestamp) {
        if (!this.timeMap.has(key)) return "";

        const timestamps = this.timeMap.get(key);
        let left = 0;
        let right = timestamps.length - 1;
        let index = Math.floor((left + right) / 2);

        while (left <= right) {
            if (timestamps[index][0] === timestamp) {
                // console.log("Got: ", timestamps[index], index);
                return timestamps[index][1];
            }
            if (timestamps[index][0] < timestamp) left = index + 1;
            if (timestamps[index][0] > timestamp) right = index - 1;
            index = Math.floor((left + right) / 2);
        }
        let res = index < 0 || index >= timestamps.length ? "" : timestamps[index][1];
        // console.log("Got: ", res, index);
        return res;
    };
}