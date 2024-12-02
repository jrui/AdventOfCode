import * as fs from 'fs';

function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    let cycle: number = 0;
    let X: number = 1;
    let sum: number = 0;
    lines.forEach((line: string) => {
        const cmd: string[] = line.split(" ");
        // console.log(cmd);

        const catchCycles: number[] = [20, 60, 100, 140, 180, 220];
        if (cmd.length === 1) {
            // noop cycle
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
        } else if (cmd.length === 2) {
            // add Y cycle 1
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
            // add Y cycle 2
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
            // end of cycle 2
            X += parseInt(cmd[1]);
        }
    });

    return sum;
}



console.log(solution());
export { solution };

