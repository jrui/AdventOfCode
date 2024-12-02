import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day02/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(' '))
        .map(lineArray => lineArray.map(x => parseInt(x)));
    let safeReadings = 0;

    lines.forEach(line => {                
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

        if (isValid) safeReadings++;
    });

    return safeReadings;
}

export default run;
  
