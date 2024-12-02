"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task1_1 = require("./task1");
/*
Calculate the sum of the three biggest values in a number list
 */
function solution2() {
    const sums = (0, task1_1.solution)().sums;
    const topThree = sums.sort((a, b) => b - a).slice(0, 3);
    console.log('TopThree: ', topThree);
    return topThree.reduce((a, acc) => a + acc, 0);
}
console.log(solution2());
