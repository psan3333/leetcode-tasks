function findDuplicates(nums) {
    let obj = new Set();

    for (let num of nums) {
        if (obj.has(num)) return true;
        obj.add(num);
    }

    return false;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 7];
console.log(findDuplicates(arr));