/**
 * @param {number[][]} isConnected
 * @return {number}
 */

var findCircleNum = function (isConnected) {
    let graph = {};
    for (let i = 0; i < isConnected.length; i++) {
        let graphNode = {
            value: i,
            visited: false,
            next: [],
        };
        for (let j = 0; j < isConnected[0].length; j++) {
            if (i === j) continue;
            if (isConnected[i][j] === 1) {
                graphNode.next.push(j);
            }
        }
        graph[i] = graphNode;
    }

    let cities = 0;
    for (let i = 0; i < isConnected.length; i++) {
        if (graph[i].visited) continue;
        let queue = [graph[i]];
        let newQueue = [];
        while (queue.length > 0) {
            for (let graphNode of queue) {
                for (let nextIdx of graphNode.next) {
                    if (!graph[nextIdx].visited) {
                        newQueue.push(graph[nextIdx]);
                        graph[nextIdx].visited = true;
                    }
                }
            }
            queue = newQueue;
            newQueue = [];
        }
        cities++;
    }
    return cities;
};

let isConnected = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
];
console.log(findCircleNum(isConnected));
