import { readFileSync } from 'fs';


function run() {
    let lines = readFileSync('./day01/input/input1.txt', 'utf-8').split('\n');

    let listA = lines.map(x => parseInt(x.split('   ')[0])).sort((a, b) => a - b);
    let listB = lines.map(x => parseInt(x.split('   ')[1])).sort((a, b) => a - b);

    let diffSum = listA
        .map((value, index) => Math.abs(value - listB[index]))
        .reduce((acc, value) => acc + value, 0);

    return diffSum;
}

export default run;
  
