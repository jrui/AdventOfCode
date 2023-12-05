import { readFileSync } from 'fs';


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function convertTextNumberToNumber(n) {
    return n
        .replaceAll('one', '1')
        .replaceAll('two', '2')
        .replaceAll('three', '3')
        .replaceAll('four', '4')
        .replaceAll('five', '5')
        .replaceAll('six', '6')
        .replaceAll('seven', '7')
        .replaceAll('eight', '8')
        .replaceAll('nine', '9')
        .replaceAll('zero', '0');
}

function run() {
    const lines = readFileSync('./day01/input/input2.txt', 'utf-8').split('\n');
    const normalizedLines = lines.map(line => {
        let newLine = convertTextNumberToNumber(line);
        if (newLine !== line) {
            // console.log(`Converted "${line}" to "${newLine}"`);
        }
        return newLine;
    });
    let sum = 0;

    normalizedLines.forEach(line => {
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
  
