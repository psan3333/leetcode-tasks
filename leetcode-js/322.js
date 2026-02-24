/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
    let graph = {};
    for (let [from, to] of tickets) {
        if (!(from in graph)) {
            graph[from] = {
                next: [],
                used: [],
            };
        }
        if (!(to in graph)) {
            graph[to] = {
                next: [],
                used: [],
            };
        }
        graph[from].next.push(to);
    }

    for (let key in graph) {
        graph[key].next.sort().reverse();
    }

    let itinerary = [];
    const traverse = (node) => {
        console.log(node);
        let destinations = graph[node].next;
        while (destinations.length > 0) {
            let next = destinations.pop();
            traverse(next);
        }
        itinerary.push(node);
    };
    traverse("JFK");
    return itinerary.reverse();
};

let tickets = [
    ["JFK", "SFO"],
    ["JFK", "ATL"],
    ["ATL", "SFO"],
    ["SFO", "JFK"],
    ["ATL", "AAA"],
    ["AAA", "ATL"],
    ["ATL", "BBB"],
    ["BBB", "ATL"],
    ["ATL", "CCC"],
    ["CCC", "ATL"],
];
console.log(findItinerary(tickets));
