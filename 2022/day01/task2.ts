import { solution } from './task1';



/*
Calculate the sum of the three biggest values in a number list
 */
function solution2(): number {
    const sums: number[] = solution().sums;
    const topThree: number[] = sums.sort((a, b) => b - a).slice(0, 3);

    console.log('TopThree: ', topThree);
    return topThree.reduce((a, acc) => a + acc, 0);
}

console.log(solution2());