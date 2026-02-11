/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
    if (!node) return node;
    let result = {
        val: node.val,
        neighbors: [],
    };
    let nodeByValue = {
        [node.val]: result,
    };
    let queue = [node];
    let newQueue = [];
    while (queue.length > 0) {
        for (let vertex of queue) {
            for (let neighbour of vertex.neighbors) {
                if (!(neighbour.val in nodeByValue)) {
                    nodeByValue[neighbour.val] = {
                        val: neighbour.val,
                        neighbors: [],
                    };
                    newQueue.push(neighbour);
                }
                nodeByValue[vertex.val].neighbors.push(
                    nodeByValue[neighbour.val],
                );
            }
        }
        queue = newQueue;
        newQueue = [];
    }
    return result;
};
