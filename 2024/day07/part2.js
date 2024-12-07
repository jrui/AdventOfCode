import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day07/input/input2.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(': '))
        .map(([result, operations]) => [Number(result), operations.split(' ').map(Number)]);

    let options = [];
    lines.map(([_, values], index) => {
        values.map(value => {
            if (options[index] === undefined) {
                options[index] = [ value ];
            }
            else {
                options[index].forEach(calculatedValue => {
                    options[index].push(value + calculatedValue);
                    options[index].push(value * calculatedValue);
                    options[index].push(Number(`${calculatedValue}${value}`));
                });
            }
        })
    });

    let possibleComputationSum = 0;
    lines.map(([result, _], index) => {
        if (options[index].includes(result)) {
            possibleComputationSum += result;
        }
    });

    return possibleComputationSum;
}

export default run;