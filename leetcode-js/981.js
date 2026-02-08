
var TimeMap = function () {
    this.timeMap = new Map();
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    let timestamps = [];
    if (this.timeMap.has(key)) {
        timestamps = this.timeMap.get(key);
    }
    timestamps.push([timestamp, value]);
    this.timeMap.set(key, timestamps);
    // console.log("Set: ", key, value, timestamps);
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    if (!this.timeMap.has(key)) return "";

    const timestamps = this.timeMap.get(key);
    let left = 0;
    let right = timestamps.length - 1;
    let index = Math.floor((left + right) / 2);

    while (left <= right) {
        if (timestamps[index][0] === timestamp) {
            // console.log("Got: ", timestamps[index], index);
            return timestamps[index][1];
        }
        if (timestamps[index][0] < timestamp) left = index + 1;
        if (timestamps[index][0] > timestamp) right = index - 1;
        index = Math.floor((left + right) / 2);
    }
    let res = index < 0 || index >= timestamps.length ? "" : timestamps[index][1];
    // console.log("Got: ", res, index);
    return res;
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

let timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
timeMap.get("foo", 1);