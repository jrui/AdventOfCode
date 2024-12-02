import * as fs from 'fs';

/*
 Read File and parse lines containing a number
 group them by blocks, each block is separated by a blank line
 */
function parseFile(filename: string): number[][] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    const lines: string[] = file.split('\n');
    const blocks: number[][] = [];

    let block: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            blocks.push(block);
            block = [];
        } else {
            block.push(parseInt(lines[i]));
        }
    }

    return blocks;
}


function solution(): Record<string, any> {
    const blocks: number[][] = parseFile('inputFile/task1.txt');
    console.log('Blocks: ', blocks);

    const sums: number[] = blocks.map(block => block.reduce((a, acc) => a+acc, 0));
    console.log('Sums: ', sums);

    return {
        sums,
        maximum: Math.max(...sums)
    };
}


console.log(solution().maximum);


export { solution };