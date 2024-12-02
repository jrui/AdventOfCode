import { readFileSync } from 'fs';
import part1 from './part1.js';


function isLineValid(line) {
    let isIncreasing = line[0] < line[1];
    let isValid = line[0] === line[1] ? false : true;
    for (let i = 0; isValid && i < line.length - 1; i++) {
        if (
            isIncreasing && !(
                line[i + 1] - line[i] >= 1 &&
                line[i + 1] - line[i] <= 3
            )
        ) {
            isValid = false;
        }
        else if (
            !isIncreasing && !(
                line[i] - line[i + 1] >= 1 &&
                line[i] - line[i + 1] <= 3
            )
        ) {
            isValid = false;
        }
    }

    return isValid;
}


function run() {
    const lines = readFileSync('./day02/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(' '))
        .map(lineArray => lineArray.map(x => parseInt(x)));
    const invalidLines = lines.filter(line => !isLineValid(line));
    
    let newValidLines = 0;
    invalidLines.forEach(line => {
        let newLineValid = false;
        for (let i = 0; !newLineValid && i < line.length; i++) {
            // Wildly inefficient but it works
            let newLine = line.slice(0, i).concat(line.slice(i + 1, line.length));
            if (isLineValid(newLine)) {
                newValidLines++;
                newLineValid = true;
            }
        }
    })

    return part1() + newValidLines;
}

export default run;
  
