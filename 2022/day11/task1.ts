import * as fs from 'fs';

function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split(''); // add newline

    return lines;
}

function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    // Write your code
    return 0;
}

export { solution };

