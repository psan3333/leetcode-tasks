/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */

var findCheapestPrice = function (n, flights, src, dst, k) {
    let graph = new Array(n).fill(Infinity);
    graph[src] = 0;
    let iterations = new Array(n).fill(0);

    const relax = (iteration) => {
        let relaxApplied = false;
        let changes = [];
        let newIterations = new Array(0).fill(0);
        for (let item of graph) {
            changes.push(item);
        }
        for (let [start, end, price] of flights) {
            if (
                graph[start] + price < graph[end] &&
                graph[start] + price < changes[end] &&
                iterations[start] + 1 <= iteration
            ) {
                relaxApplied = true;
                changes[end] = graph[start] + price;
                newIterations[end] = iterations[start] + 1;
            }
        }
        for (let i = 0; i < changes.length; i++) {
            if (newIterations[i] === iteration) {
                graph[i] = changes[i];
                iterations[i] = newIterations[i];
            }
        }
        return relaxApplied;
    };

    for (let i = 1; i <= k + 1; i++) {
        // n repeats
        relax(i);
    }
    if (relax()) return -1;
    return graph[dst] === Infinity ? -1 : graph[dst];
};
