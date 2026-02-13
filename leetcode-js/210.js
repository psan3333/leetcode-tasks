/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    if (prerequisites.length === 0) {
        let res = new Array(numCourses).fill(0);
        return res.map((_, index) => res.length - index - 1);
    }
    let graph = {};
    for (let [course, prereq] of prerequisites) {
        if (!(course in graph)) {
            graph[course] = {
                course: course,
                prev: [],
            };
        }
        if (!(prereq in graph)) {
            graph[prereq] = {
                course: prereq,
                prev: [],
            };
        }
        graph[course].prev.push(prereq);
    }

    let result = []; // last stack elements will be pushed into result
    let dfsVisited = new Array(numCourses).fill(false); // track current callStack of dfs
    let visited = new Array(numCourses).fill(false); // overall visited by dfs

    let hasCycle = false;
    const traverse = (course) => {
        if (hasCycle) return;
        dfsVisited[course] = true;
        visited[course] = true;
        for (let prevCourse of graph[course].prev) {
            if (dfsVisited[prevCourse]) {
                hasCycle = true;
                dfsVisited[course] = false;
                return;
            }
            if (!visited[prevCourse]) traverse(prevCourse);
        }
        dfsVisited[course] = false;
        result.push(course);
    };
    for (let course in graph) {
        course = Number(course);
        if (!visited[course]) traverse(course);
        if (hasCycle) return [];
    }
    for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) result.push(i);
    }
    return result;
};

let numCourses = 5;
let prerequisites = [
    [1, 0],
    [0, 2],
    [3, 4],
];
console.log(findOrder(numCourses, prerequisites));
