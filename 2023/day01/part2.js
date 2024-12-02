import { readFileSync } from 'fs';


function convertStringToNumber(n) {
    // This is a terrible way to do this, but it works.
    // Remove all unused letters, and replace all words with numbers.
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
        .replaceAll(/\D/g,'');
}

function run() {
    const lines = readFileSync('./day01/input/input2.txt', 'utf-8').split('\n');
    const normalizedLines = lines.map(line => {
        const newLine = convertStringToNumber(line);
        return Number.parseInt(newLine[0] + newLine[newLine.length - 1]);
    });

    return normalizedLines.reduce((prev, curr) => prev + curr, 0);
}

export default run;
  
