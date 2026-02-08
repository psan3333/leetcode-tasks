/**
 * @param {string} senate
 * @return {string}
 */

class NewQueue {
    constructor() {
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    createNode(value) {
        return {
            value: value,
            next: null,
        };
    }

    peek() {
        return this.front.value;
    }

    pushBack(value) {
        let node = this.createNode(value);
        if (this.length === 0) {
            this.front = node;
            this.back = node;
        } else {
            this.back.next = node;
            this.back = node;
        }

        this.length++;
    }

    popFront() {
        let value = this.front.value;
        if (this.length === 1) {
            this.front = null;
            this.back = null;
        } else {
            this.front = this.front.next;
        }
        this.length--;
        return value;
    }
}

var predictPartyVictory = function (senate) {
    let queue = new NewQueue();
    let trackSenatePartiesCount = new Map();
    trackSenatePartiesCount.set("R", 0);
    trackSenatePartiesCount.set("D", 0);

    for (let i = 0; i < senate.length; i++) {
        trackSenatePartiesCount.set(
            senate[i],
            trackSenatePartiesCount.get(senate[i]) + 1,
        );
        queue.pushBack(senate[i]);
    }
    if (trackSenatePartiesCount.get("R") === 0) return "Dire";
    if (trackSenatePartiesCount.get("D") === 0) return "Radiant";

    while (true) {
        let topParty = queue.peek();
        while (queue.peek() === topParty) {
            let member = queue.popFront();
            queue.pushBack(member);
        }
        let partyToBan = queue.popFront();
        trackSenatePartiesCount.set(
            partyToBan,
            trackSenatePartiesCount.get(partyToBan) - 1,
        );

        // check for victory
        if (
            trackSenatePartiesCount.get(partyToBan) === 0 &&
            trackSenatePartiesCount.get(topParty) != 0
        ) {
            return topParty === "R" ? "Radiant" : "Dire";
        }
    }
};

let senate = "DDRRR";
console.log(predictPartyVictory(senate));
