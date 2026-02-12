/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    if (prerequisites.length === 0) return true;
    let graph = {};

    const addCourse = (course) => {
        graph[course] = {
            course: course,
            next: [],
        };
    };

    let firstCourses = new Set();
    for (let prerequisite of prerequisites) {
        let [firstCourse, prevCourse] = prerequisite;
        if (!(firstCourse in graph)) addCourse(firstCourse);
        if (!(prevCourse in graph)) addCourse(prevCourse);
        graph[prevCourse].next.push(firstCourse);
        firstCourses.add(prevCourse);
    }

    // start iteration
    let hasCycle = false;
    let visited = new Array(numCourses).fill(false);
    let dfsCallStack = new Array(numCourses).fill(false);

    const checkCourses = (course) => {
        let nextCourses = graph[course].next;
        visited[course] = true;
        dfsCallStack[course] = true;
        for (let next of nextCourses) {
            if (dfsCallStack[next]) {
                hasCycle = true;
                dfsCallStack[course] = false;
                return;
            }
            if (!visited[next]) checkCourses(next);
        }
        dfsCallStack[course] = false;
    };

    firstCourses = Array.from(firstCourses);
    for (let firstCourse of firstCourses) {
        if (!visited[firstCourse]) checkCourses(firstCourse);
    }

    return !hasCycle;
};
