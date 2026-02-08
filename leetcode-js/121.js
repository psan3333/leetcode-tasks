function maxProfit(prices) {
    let minValue = prices[0];
    let maxProf = 0;
    let decline = true;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i - 1] - prices[i] > 0) decline = true;
        else decline = false;

        console.log(prices[i], minValue, decline, i);
        if (decline) {
            minValue = minValue > prices[i] ? prices[i] : minValue;
        }
        if (!decline) {
            maxProf = prices[i] - minValue > maxProf ? prices[i] - minValue : maxProf;
        }
    }

    return maxProf;
}

let prices = [1, 2, 3, 4, 3, 2, 1, 0, 1];
console.log(maxProfit(prices));

let num = 0;
for (let i = 1; i < 200; i++) {
    num += i;
}

console.log(num);