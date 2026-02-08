/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

class NewQueue {
    constructor() {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    createNode(value) {
        return {
            value: value,
            next: null,
        };
    }

    enQueue(value) {
        let insertNode = this.createNode(value);
        if (!this.front) {
            this.front = insertNode;
            this.back = insertNode;
        } else {
            this.back.next = insertNode;
            this.back = this.back.next;
        }
        this.length++;
    }

    deQueue() {
        let result = this.front.value;
        if (this.front.next === null) {
            this.front = null;
            this.back = null;
        } else {
            this.front = this.front.next;
        }
        this.length--;
        return result;
    }

    isEmpty() {
        return this.length <= 0;
    }
}

function createNDimArray(value, ...dims) {
    if (dims.length === 1) {
        let arr = new Array(dims[0]);
        arr.fill(value);
        return arr;
    }
    let result = [];
    for (let dim = 0; dim < dims[0]; dim++) {
        result.push(createNDimArray(value, ...dims.slice(1)));
    }
    return result;
}

function possibleSteps(deadends, visited, position) {
    let positions = [];
    for (let i = 0; i < position.length; i++) {
        for (let pos = position[i] - 1; pos <= position[i] + 1; pos += 2) {
            let posToFill = pos < 0 ? 9 : pos;
            posToFill = posToFill > 9 ? 0 : posToFill;
            let p = [
                ...position.slice(0, i),
                posToFill,
                ...position.slice(i + 1),
            ];
            if (!visited.has(p.join("")) && !deadends.has(p.join(""))) {
                positions.push(p);
            }
        }
    }
    return positions;
}

function minRotations(matrixSpace, visited, position) {
    let min = 1000;
    for (let i = 0; i < position.length; i++) {
        for (let pos = position[i] - 1; pos <= position[i] + 1; pos += 2) {
            let posToFill = pos < 0 ? 9 : pos;
            posToFill = posToFill > 9 ? 0 : posToFill;
            let p = [
                ...position.slice(0, i),
                posToFill,
                ...position.slice(i + 1),
            ];
            if (visited.has(p.join(""))) {
                min = Math.min(min, matrixSpace[p[0]][p[1]][p[2]][p[3]]);
            }
        }
    }
    return Math.min(
        min,
        matrixSpace[position[0]][position[1]][position[2]][position[3]],
    );
}

var openLock = function (deadends, target) {
    // concept is to find shortest path from start to target in 4D matrix using BFS
    let matrixSpace = createNDimArray(Infinity, 10, 10, 10, 10);
    let visited = new Set();
    let start = [0, 0, 0, 0]; // encoded by indexes
    let end = [];
    matrixSpace[start[0]][start[1]][start[2]][start[3]] = 0;
    for (let char of target) {
        end.push(Number(char));
    }
    deadends = new Set(deadends);
    if (deadends.has(start.join(""))) {
        return -1;
    }
    // start traversing space from start to target

    let queue = new NewQueue();
    queue.enQueue(start);
    visited.add(start.join(""));
    while (!queue.isEmpty()) {
        let cPos = queue.deQueue();
        visited.add(cPos.join(""));
        let positions = possibleSteps(deadends, visited, cPos);
        for (let pos of positions) {
            matrixSpace[pos[0]][pos[1]][pos[2]][pos[3]] =
                minRotations(matrixSpace, visited, pos) + 1;
            visited.add(pos.join(""));
            queue.enQueue(pos);
        }
    }
    let result = matrixSpace[end[0]][end[1]][end[2]][end[3]];
    return result === Infinity ? -1 : result;
};
