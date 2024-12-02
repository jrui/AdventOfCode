import * as fs from 'fs';

function parseFile(filename: string): string {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines[0];
}

function solution(): any {
    const lines: string = parseFile('inputFiles/task1.txt');

    for (let i = 0; i < lines.length - 14; i++) {
        if (lines[i] != lines[i + 1] &&
            lines[i] != lines[i + 2] &&
            lines[i] != lines[i + 3] &&
            lines[i] != lines[i + 4] &&
            lines[i] != lines[i + 5] &&
            lines[i] != lines[i + 6] &&
            lines[i] != lines[i + 7] &&
            lines[i] != lines[i + 8] &&
            lines[i] != lines[i + 9] &&
            lines[i] != lines[i + 10] &&
            lines[i] != lines[i + 11] &&
            lines[i] != lines[i + 12] &&
            lines[i] != lines[i + 13] &&
            lines[i + 1] != lines[i + 2] &&
            lines[i + 1] != lines[i + 3] &&
            lines[i + 1] != lines[i + 4] &&
            lines[i + 1] != lines[i + 5] &&
            lines[i + 1] != lines[i + 6] &&
            lines[i + 1] != lines[i + 7] &&
            lines[i + 1] != lines[i + 8] &&
            lines[i + 1] != lines[i + 9] &&
            lines[i + 1] != lines[i + 10] &&
            lines[i + 1] != lines[i + 11] &&
            lines[i + 1] != lines[i + 12] &&
            lines[i + 1] != lines[i + 13] &&
            lines[i + 2] != lines[i + 3] &&
            lines[i + 2] != lines[i + 4] &&
            lines[i + 2] != lines[i + 5] &&
            lines[i + 2] != lines[i + 6] &&
            lines[i + 2] != lines[i + 7] &&
            lines[i + 2] != lines[i + 8] &&
            lines[i + 2] != lines[i + 9] &&
            lines[i + 2] != lines[i + 10] &&
            lines[i + 2] != lines[i + 11] &&
            lines[i + 2] != lines[i + 12] &&
            lines[i + 2] != lines[i + 13] &&
            lines[i + 3] != lines[i + 4] &&
            lines[i + 3] != lines[i + 5] &&
            lines[i + 3] != lines[i + 6] &&
            lines[i + 3] != lines[i + 7] &&
            lines[i + 3] != lines[i + 8] &&
            lines[i + 3] != lines[i + 9] &&
            lines[i + 3] != lines[i + 10] &&
            lines[i + 3] != lines[i + 11] &&
            lines[i + 3] != lines[i + 12] &&
            lines[i + 3] != lines[i + 13] &&
            lines[i + 4] != lines[i + 5] &&
            lines[i + 4] != lines[i + 6] &&
            lines[i + 4] != lines[i + 7] &&
            lines[i + 4] != lines[i + 8] &&
            lines[i + 4] != lines[i + 9] &&
            lines[i + 4] != lines[i + 10] &&
            lines[i + 4] != lines[i + 11] &&
            lines[i + 4] != lines[i + 12] &&
            lines[i + 4] != lines[i + 13] &&
            lines[i + 5] != lines[i + 6] &&
            lines[i + 5] != lines[i + 7] &&
            lines[i + 5] != lines[i + 8] &&
            lines[i + 5] != lines[i + 9] &&
            lines[i + 5] != lines[i + 10] &&
            lines[i + 5] != lines[i + 11] &&
            lines[i + 5] != lines[i + 12] &&
            lines[i + 5] != lines[i + 13] &&
            lines[i + 6] != lines[i + 7] &&
            lines[i + 6] != lines[i + 8] &&
            lines[i + 6] != lines[i + 9] &&
            lines[i + 6] != lines[i + 10] &&
            lines[i + 6] != lines[i + 11] &&
            lines[i + 6] != lines[i + 12] &&
            lines[i + 6] != lines[i + 13] &&
            lines[i + 7] != lines[i + 8] &&
            lines[i + 7] != lines[i + 9] &&
            lines[i + 7] != lines[i + 10] &&
            lines[i + 7] != lines[i + 11] &&
            lines[i + 7] != lines[i + 12] &&
            lines[i + 7] != lines[i + 13] &&
            lines[i + 8] != lines[i + 9] &&
            lines[i + 8] != lines[i + 10] &&
            lines[i + 8] != lines[i + 11] &&
            lines[i + 8] != lines[i + 12] &&
            lines[i + 8] != lines[i + 13] &&
            lines[i + 9] != lines[i + 10] &&
            lines[i + 9] != lines[i + 11] &&
            lines[i + 9] != lines[i + 12] &&
            lines[i + 9] != lines[i + 13] &&
            lines[i + 10] != lines[i + 11] &&
            lines[i + 10] != lines[i + 12] &&
            lines[i + 10] != lines[i + 13] &&
            lines[i + 11] != lines[i + 12] &&
            lines[i + 11] != lines[i + 13] &&
            lines[i + 12] != lines[i + 13]) {
            return i + 14;
        }
    }

    // not ZMNS
    // not FJHW
    // not 1130
    // not 1135
    return '';
}


console.log(solution());
export { solution };

