function compareIntervals(i1, i2) {
    let diff1 = i1[0] - i2[0];
    let diff2 = i1[1] - i2[1];
    if (diff1 < 0) return -1;
    else if (diff1 > 0) return 1;
    else {
        if (diff2 < 0) return -1;
        if (diff2 > 0) return 1;
    }
    return 0;
}

function union(i1, i2) {
    if (i1[1] >= i2[0]) return [i1[0], i2[1]];
    else return null;
}

function exclusion(i1, i2) {
    return [i1[1], i2[0]];
}

var freeTime = (schedule) => {
    let intervals = [];
    for (let employeeSchedule of schedule) {
        intervals.push(...employeeSchedule);
    }

    intervals.sort(compareIntervals);

    let result = [];
    let currentInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        let intervalsUnion = union(currentInterval, intervals[i]);
        if (intervalsUnion === null) {
            result.push(exclusion(currentInterval, intervals[i]));
            currentInterval = intervals[i];
        } else {
            currentInterval = intervalsUnion;
        }
    }
    return result;
};

let schedule = [
    [
        [1, 2],
        [4, 5],
        [3, 4],
    ],
    [
        [1, 3],
        [6, 10],
    ],
];
console.log(freeTime(schedule));
