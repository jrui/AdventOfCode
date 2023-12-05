import { readFileSync } from 'fs';


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function run() {
    const lines = readFileSync('./day01/input/input1.txt', 'utf-8').split('\n');
    let sum = 0;

    lines.forEach(line => {
        let firstNumber = '';
        for(let i = 0; i < line.length; i++) {
            if(isNumber(line[i])) {
                firstNumber = line[i];
                break;
            }
        }

        let lastNumber = '';
        for(let i = line.length - 1; i >= 0; i--) {
            if(isNumber(line[i])) {
                lastNumber = line[i];
                break;
            }
        }

        sum += parseInt(firstNumber + lastNumber);
    });

    return sum;
}

export default run;
  
