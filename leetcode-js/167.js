
function binSearch(nums, target, left, right) {
    let initRight = right;
    let index = Math.floor((left + right) / 2);

    while (left <= right && index <= right) {
        if (nums[index] === target) {
            if (index < nums.length - 1 && nums[index + 1] === nums[index]) {
                index = binSearch(nums, target + 1, left, initRight);
            }
            return index;
        };
        if (nums[index] < target) left = index + 1;
        if (nums[index] > target) right = index - 1;

        index = Math.floor((left + right) / 2);
    }


    return index;
}

function twoSum(numbers, target) {
    let right = numbers.length - 1;
    let currentIndex = 0;

    while (currentIndex <= right) {
        let currNum = numbers[currentIndex];
        // console.log('search right');
        right = binSearch(numbers, target - currNum, currentIndex, right);
        if (currNum === target - numbers[right]) return [currentIndex + 1, right + 1];
        // console.log('search index');
        currentIndex = binSearch(numbers, numbers[currentIndex + 1], currentIndex + 1, right - 1);
    }

    return [];
}


let nums = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 10, 15];
let res = twoSum(nums, 8);
console.log(nums[res[0] - 1], nums[res[1] - 1]);