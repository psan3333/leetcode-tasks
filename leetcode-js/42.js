function trapFirstSolution(height) {
    let left = 0;
    let right = height.length - 1;
    let fillLevel = 1;
    let result = 0;

    let wallHeightTracking = new Map();

    height.forEach((value, index) => {
        if (wallHeightTracking.has(value)) {
            let valueOccurrences = wallHeightTracking.get(value);
            wallHeightTracking.set(value, valueOccurrences + value);
        } else {
            wallHeightTracking.set(value, value);
        }
    });

    const removeValueFromTracking = (value) => {
        let valueOccurrences = wallHeightTracking.get(value);
        wallHeightTracking.set(value, valueOccurrences - value);
    };

    outerLoop: while (left < right) {
        while (height[left] < fillLevel) {
            removeValueFromTracking(height[left]);
            left++;
            if (left > right) break outerLoop;
        }
        while (height[right] < fillLevel) {
            removeValueFromTracking(height[right]);
            right--;
            if (left > right) break outerLoop;
        }

        minEdge = Math.min(height[left], height[right]);
        let levelsToFill = minEdge - fillLevel + 1;
        result = result + (right - left + 1) * levelsToFill;

        for (
            let hBetweenLevels = fillLevel;
            hBetweenLevels <= minEdge;
            hBetweenLevels++
        ) {
            if (wallHeightTracking.has(hBetweenLevels)) {
                let elem = wallHeightTracking.get(hBetweenLevels);
                result -= elem;
            }
        }
        fillLevel = minEdge + 1;
    }

    return result;
}

// Optimal Solution - written also by me
var trap = function (height) {
    let left = 0;
    let right = height.length - 1;
    let fillLevel = 1;
    let result = 0;
    let totalVolumeOfBars = height.reduce((acc, val) => (acc += val), 0);

    outerLoop: while (left <= right) {
        while (height[left] < fillLevel) {
            left++;
            if (left > right) break outerLoop;
        }
        while (height[right] < fillLevel) {
            right--;
            if (left > right) break outerLoop;
        }

        minEdge = Math.min(height[left], height[right]);
        let levelsToFill = minEdge - fillLevel + 1;
        result = result + (right - left + 1) * levelsToFill;
        fillLevel = minEdge + 1;
    }

    return result - totalVolumeOfBars;
};

// let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
// let height = [4, 2, 0, 3, 2, 5];
let height = [2, 0, 2];
// let height = [6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1, 3, 4, 6, 8, 1, 3];
console.log(trap(height));
