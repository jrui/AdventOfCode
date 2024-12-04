import { readFileSync } from 'fs';


function run() {
    const board = readFileSync('./day04/input/input1.txt', 'utf-8')
        .split('\n')
        .map(x => x.split(''));

    let foundXMas = 0;
    for (let j = 1; j < board.length - 1; j++) {
        for (let i = 1; i < board[j].length - 1; i++) {
            if (board[j][i] !== 'A') {
                continue;
            }

            if (board[j-1][i-1] === 'M' && board[j+1][i+1] === 'S') {
                /**
                 * Checks for:
                 * M . .
                 * . A .
                 * . . S
                 */
                if (board[j-1][i+1] === 'M' && board[j+1][i-1] === 'S') {
                    /**
                     * Checks for:
                     * M . M
                     * . A .
                     * S . S
                     */
                    foundXMas++;
                }
                else if (board[j+1][i-1] === 'M' && board[j-1][i+1] === 'S') {
                    /**
                     * Checks for:
                     * M . S
                     * . A .
                     * M . S
                     */
                    foundXMas++;
                }
            }
            else if (board[j-1][i-1] === 'S' && board[j+1][i+1] === 'M') {
                /**
                 * Checks for:
                 * S . .
                 * . A .
                 * . . M
                 */
                if (board[j-1][i+1] === 'S' && board[j+1][i-1] === 'M') {
                    /**
                     * Checks for:
                     * S . S
                     * . A .
                     * M . M
                     */
                    foundXMas++;
                }
                else if (board[j+1][i-1] === 'S' && board[j-1][i+1] === 'M') {
                    /**
                     * Checks for:
                     * S . M
                     * . A .
                     * S . M
                     */
                    foundXMas++;
                }
            }
        }
    }

    return foundXMas;
}

export default run;
  
