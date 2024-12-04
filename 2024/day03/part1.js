import { readFileSync } from 'fs';


function run(lineInput = undefined) {
    const lines = lineInput || readFileSync('./day03/input/input1.txt', 'utf-8').split('\n');
    const validOperations = lines.map(line => 
        line.match(/mul\([0-9]+,[0-9]+\)/g)
            .map(mulLine => 
                mulLine.slice(4, mulLine.length - 1)
                    .split(',')
                    .map(Number)
            )
        );

    let sum = 0;
    validOperations.map(operations => {
        for (let operation of operations) {
            const [a, b] = operation;
            sum += a * b;
        }
        
    });

    return sum;
}

export default run;
  
