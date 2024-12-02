import * as fs from 'fs';

/*
[N] [G]                     [Q]
[H] [B]         [B] [R]     [H]
[S] [N]     [Q] [M] [T]     [Z]
[J] [T]     [R] [V] [H]     [R] [S]
[F] [Q]     [W] [T] [V] [J] [V] [M]
[W] [P] [V] [S] [F] [B] [Q] [J] [H]
[T] [R] [Q] [B] [D] [D] [B] [N] [N]
[D] [H] [L] [N] [N] [M] [D] [D] [B]
 1   2   3   4   5   6   7   8   9
 */
let board: string[][] = [
    ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
    ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
    ['L', 'Q', 'V'],
    ['N', 'B', 'S', 'W', 'R', 'Q'],
    ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
    ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
    ['D', 'B', 'Q', 'J'],
    ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
    ['B', 'N', 'H', 'M', 'S'],
];


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}

function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    for (let i = 0; i < lines.length; i++) {
        const [a, qtToMove, b, from, c, to] = lines[i].split(' ');

        for (let j = 0; j < parseInt(qtToMove); j++) {
            const value = board[parseInt(from) - 1].pop();
            value ? board[parseInt(to) - 1].push(value) : null;
        }
    }

    console.log(board);
    let stackTop: string = '';
    board.forEach((stack: string[]) => stackTop += stack.pop());
    // Write your code
    return stackTop;
}


console.log(solution());
export { solution };

