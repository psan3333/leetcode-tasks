

function maxArea(height) {

    const argmin = (a, b, idx1, idx2) => {
        return a < b ? idx1 : idx2;
    }

    let left = 0;
    let right = height.length - 1;
    let maxAreaFilled = 0;
    let maxRes = [];

    while (left < right) {
        let minHeight = Math.min(height[left], height[right]);
        let minIndex = argmin(height[left], height[right], left, right);
        let filledArea = minHeight * (right - left);

        if (filledArea > maxAreaFilled) {
            maxAreaFilled = filledArea;
            maxRes = [left, right];
        }

        if (minIndex === left) left += 1;
        else if (minIndex === right) right -= 1;
    }

    return maxAreaFilled;
}

let height = [9, 1, 2, 3, 4, 5, 1, 2, 5, 10, 3, 4];
console.log(maxArea(height));