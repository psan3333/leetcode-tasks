/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function (nums1, nums2) {
    if (nums1.length > nums2.length) {
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }
    let overallLength = nums1.length + nums2.length;
    let medianPartitionLen = Math.floor(overallLength / 2);

    const floor = (num1, num2) => {
        return Math.floor((num1 + num2 + 1) / 2);
    }

    let left = 0;
    let right = nums1.length - 1;
    let partition1Idx = floor(left, right);
    let partition2Idx = nums2.length - (medianPartitionLen - (nums1.length - partition1Idx));

    while (true) {
        let par1Left = partition1Idx <= 0 ? -Infinity : nums1[partition1Idx - 1];
        let par1Right = partition1Idx >= nums1.length ? Infinity : nums1[partition1Idx];

        let par2Left = partition2Idx <= 0 ? -Infinity : nums2[partition2Idx - 1];
        let par2Right = partition2Idx >= nums2.length ? Infinity : nums2[partition2Idx];
        // console.log(par1Left, par1Right, par2Left, par2Right);
        // console.log("\n");

        if (par1Left <= par2Right && par2Left <= par1Right) {
            par1Left = par1Left === -Infinity ? par2Left : par1Left;
            par1Right = par1Right === Infinity ? par2Right : par1Right;
            par2Left = par2Left === -Infinity ? par1Left : par2Left;
            par2Right = par2Right === Infinity ? par1Right : par2Right;
            if (overallLength % 2 === 0) {
                return (Math.max(par1Left, par2Left) + Math.min(par1Right, par2Right)) / 2;
            }
            return Math.max(par1Left, par2Left);
        }
        if (par1Right < par2Left) {
            left = partition1Idx + 1;
        }
        if (par1Left > par2Right) {
            right = partition1Idx - 1;
        }
        partition1Idx = floor(left, right);
        partition2Idx = nums2.length - (medianPartitionLen - (nums1.length - partition1Idx));
        // console.log(left, right, partition1Idx, partition2Idx, medianPartitionLen);
    }
}

let nums1 = [2], nums2 = [3];
console.log(findMedianSortedArrays(nums1, nums2));