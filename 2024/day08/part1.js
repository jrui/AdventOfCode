import { readFileSync } from 'fs';


function run() {
    const board = readFileSync('./day08/input/input1.txt', 'utf-8')
        .split('\n')
        .map(row => row.split(''));
    let antinodeBoard = board.map(row => row.map(_ => '.'));

    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i < board[j].length; i++) {
            if (board[j][i].match(/[a-zA-Z0-9]/g)) {
                for (let y = j; y < board.length; y++) {
                    for (let x = 0; x < board[y].length; x++) {
                        if (board[y][x] === board[j][i]) {
                            if (y === j && x === i) {
                                continue;
                            }

                            let xDistance = x - i;
                            let yDistance = y - j;

                            if (i - xDistance >= 0 && i - xDistance < board[j].length && j - yDistance >= 0 && j - yDistance < board.length) {
                                // within board
                                if (board[j - yDistance][i - xDistance].match(/[a-zA-Z0-9.]/g)) {
                                    antinodeBoard[j - yDistance][i - xDistance] = '#';
                                }
                            }
                            if (x + xDistance < board[y].length && x + xDistance >= 0 && y + yDistance < board.length && y + yDistance >= 0) {
                                // within board
                                if (board[y + yDistance][x + xDistance].match(/[a-zA-Z0-9.]/g)) {
                                    antinodeBoard[y + yDistance][x + xDistance] = '#';
                                }
                            }

                            // console.log(`(${i}, ${j}) -> (${x}, ${y}) -> (${i - xDistance}, ${j - yDistance}) -> (${x + xDistance}, ${y + yDistance})`);
                            break;
                        }
                    }
                }
            }
        }
    }
    // console.log(antinodeBoard.map(row => row.join('')).join('\n'));

    return antinodeBoard
        .map(row => row.filter(cell => cell === '#').length)
        .reduce((acc, val) => acc + val, 0);
}

export default run;
  
