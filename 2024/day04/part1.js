import { readFileSync } from 'fs';


function run() {
    const board = readFileSync('./day04/input/input1.txt', 'utf-8')
        .split('\n')
        .map(x => x.split(''));

    let foundXMas = 0;
    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i < board[j].length; i++) {
            if (board[j][i] !== 'X') {
                continue;
            }

            if (i + 3 < board[j].length) {
                // Check Horizontal Forward
                if (board[j][i + 1] === 'M' && board[j][i + 2] === 'A' && board[j][i + 3] === 'S') {
                    foundXMas++;
                }
            }

            if (i - 3 >= 0) {
                // Check Horizontal Backward
                if (board[j][i - 1] === 'M' && board[j][i - 2] === 'A' && board[j][i - 3] === 'S') {
                    foundXMas++;
                }
            }

            if (j + 3 < board.length) {
                // Check Vertical Down
                if (board[j + 1][i] === 'M' && board[j + 2][i] === 'A' && board[j + 3][i] === 'S') {
                    foundXMas++;
                }
            }

            if (j - 3 >= 0) {
                // Check Vertical Up
                if (board[j - 1][i] === 'M' && board[j - 2][i] === 'A' && board[j - 3][i] === 'S') {
                    foundXMas++;
                }
            }

            if (i + 3 <= board[j].length && j + 3 < board.length) {
                // Check Diagonal Down Right
                if (board[j + 1][i + 1] === 'M' && board[j + 2][i + 2] === 'A' && board[j + 3][i + 3] === 'S') {
                    foundXMas++;
                }
            }

            if (i - 3 >= 0 && j + 3 < board.length) {
                // Check Diagonal Down Left
                if (board[j + 1][i - 1] === 'M' && board[j + 2][i - 2] === 'A' && board[j + 3][i - 3] === 'S') {
                    foundXMas++;
                }
            }

            if (i + 3 < board[j].length && j - 3 >= 0) {
                // Check Diagonal Up Right
                if (board[j - 1][i + 1] === 'M' && board[j - 2][i + 2] === 'A' && board[j - 3][i + 3] === 'S') {
                    foundXMas++;
                }
            }

            if (i - 3 >= 0 && j - 3 >= 0) {
                // Check Diagonal Up Left
                if (board[j - 1][i - 1] === 'M' && board[j - 2][i - 2] === 'A' && board[j - 3][i - 3] === 'S') {
                    foundXMas++;
                }
            }
        }
    }

    return foundXMas;
}

export default run;
  
