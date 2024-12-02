import { readFileSync } from 'fs';


function run() {
    let lines = readFileSync('./day01/input/input2.txt', 'utf-8').split('\n');

    let listA = lines.map(x => parseInt(x.split('   ')[0])).sort((a, b) => a - b);
    let listB = lines.map(x => parseInt(x.split('   ')[1])).sort((a, b) => a - b);

    let setA = {};
    listA.forEach(x => {
        if (setA[x]) setA[x] = setA[x] + 1
        else setA[x] = 1
    });

    let setB = {};
    listB.forEach(x => {
        if (setB[x]) setB[x] = setB[x] + 1
        else setB[x] = 1
    });

    let score = 0;
    Object.keys(setA).forEach(x => {
        if (setA[x] && setB[x]) {
            score += x * setA[x] * setB[x];
        }
    });

    return score;
}

export default run;
  
