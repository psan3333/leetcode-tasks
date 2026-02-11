/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    let graph = {};

    for (let i = 0; i < edges.length; i++) {
        const [start, end] = edges[i];
        if (start in graph) {
            graph[start].next.push(end);
            graph[start].edgeNum.push(i);
        } else {
            graph[start] = {
                next: [end],
                edgeNum: [i],
                visited: false,
                depth: 0,
            };
        }
        if (end in graph) {
            graph[end].next.push(start);
            graph[end].edgeNum.push(i);
        } else {
            graph[end] = {
                next: [start],
                edgeNum: [i],
                visited: false,
                depth: 0,
            };
        }
    }

    let cycleStart = null;
    let depth = 0;

    const traverse = (nodeIdx) => {
        let node = graph[nodeIdx];
        graph[nodeIdx].visited = true;
        graph[nodeIdx].depth = depth;
        depth++;
        console.log("node", nodeIdx, node.next, depth);
        for (let i = 0; i < node.next.length; i++) {
            if (graph[node.next[i]].next[graph[node.next[i]].to] === nodeIdx)
                continue;
            if (
                node.depth - graph[node.next[i]].depth > 1 &&
                graph[node.next[i]].visited
            ) {
                console.log("cycle found");
                depth--;
                cycleStart = node.next[i];
                node.to = i;
                return true;
            }
            console.log(node.next[i]);
            node.to = i;
            let traverseResult = traverse(node.next[i]);
            if (traverseResult) {
                depth--;
                return true;
            }
            node.to = null;
        }
        depth--;
        return false;
    };
    traverse(1);

    let maxIdx = 0;
    let currNode = graph[cycleStart];
    console.log(cycleStart);
    while (true) {
        let next = currNode.next[currNode.to];
        maxIdx = Math.max(maxIdx, currNode.edgeNum[currNode.to]);
        if (next === cycleStart) break;
        currNode = graph[next];
    }

    return edges[maxIdx];
};

let edges = [
    [2, 7],
    [7, 8],
    [3, 6],
    [2, 5],
    [6, 8],
    [4, 8],
    [2, 8],
    [1, 8],
    [7, 10],
    [3, 9],
];
console.log(findRedundantConnection(edges));
