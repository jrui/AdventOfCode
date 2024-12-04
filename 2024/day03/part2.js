import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day03/input/input2.txt', 'utf-8').split('\n');

    const normalizedLines = lines.map(line => line.match(/(do\(\))|(don't\(\))|(mul\([0-9]+,[0-9]+\))/g));
    
    let adding = true;
    let sum = 0;
    normalizedLines.forEach(line => {
        line.forEach(operation => {
            switch (operation) {
                case 'do()':
                    adding = true;
                    break;
                case "don't()":
                    adding = false;
                    break;
                default:
                    const [a, b] = operation.slice(4, operation.length - 1).split(',').map(Number);
                    if (adding) {
                        sum += a * b;
                    }
            }
        })
    });

    return sum;
}


export default run;