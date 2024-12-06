import { readFileSync } from 'fs';


function findStartingPosition(board) {
    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i < board[j].length; i++) {
            switch(board[j][i]) {
                case '^':
                case 'v':
                case '>':
                case '<':
                    return [i, j];
                default:
                    break;
            }
        }
    }
}


function run() {
    const board = readFileSync('./day06/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''));

    let [currentX, currentY] = findStartingPosition(board);
    let guardInBoard = true;
    while (guardInBoard && currentX > 0 && currentX < board[0].length - 1 && currentY > 0 && currentY < board.length - 1) {
        switch (board[currentY][currentX]) {
            case '^':
                if (board[currentY - 1][currentX] === '#') {
                    board[currentY][currentX] = '>';
                }
                else {
                    board[currentY][currentX] = 'x';
                    currentY--;
                    board[currentY][currentX] = '^';
                }
                break;
            case 'v':
                if (board[currentY + 1][currentX] === '#') {
                    board[currentY][currentX] = '<';
                }
                else {
                    board[currentY][currentX] = 'x';
                    currentY++;
                    board[currentY][currentX] = 'v';
                }
                break;
            case '>':
                if (board[currentY][currentX + 1] === '#') {
                    board[currentY][currentX] = 'v';
                }
                else {
                    board[currentY][currentX] = 'x';
                    currentX++;
                    board[currentY][currentX] = '>';
                }
                break;
            case '<':
                if (board[currentY][currentX - 1] === '#') {
                    board[currentY][currentX] = '^';
                }
                else {
                    board[currentY][currentX] = 'x';
                    currentX--;
                    board[currentY][currentX] = '<';
                }
                break;
            default:
                guardInBoard = false;
                break;
        }
    }

    return board
        .map(line => line.filter(cell => ['x', '>', 'v', '<', '^'].includes(cell)).length)
        .reduce((acc, val) => acc + val, 0);
}

export default run;
  
