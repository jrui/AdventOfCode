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
    // 1 milisecond per loop seems to be enough
    const TIME_FOR_LOOP = 1;
    const board = readFileSync('./day06/input/input2.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''));

    let [currentX, currentY] = findStartingPosition(board);
    let initialCell = board[currentY][currentX];
    let initialX = currentX;
    let initialY = currentY;
    let guardInBoard = true;

    let numOfLoops = 1;
    let startTime, currentTime;
    // let us brute force it and reuse code from part1!!!
    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i < board[j].length; i++) {
            currentX = initialX;
            currentY = initialY;
            board[initialY][initialX] = initialCell;

            if (board[j][i] === '.') {
                board[j][i] = '#';
                guardInBoard = true;
                startTime = Date.now();
                currentTime = Date.now();    
                while (currentTime <= startTime + TIME_FOR_LOOP && guardInBoard && currentX > 0 && currentX < board[0].length - 1 && currentY > 0 && currentY < board.length - 1) {
                    switch (board[currentY][currentX]) {
                        case '^':
                            if (board[currentY - 1][currentX] === '#') {
                                board[currentY][currentX] = '>';
                            }
                            else {
                                board[currentY][currentX] = '.';
                                currentY--;
                                board[currentY][currentX] = '^';
                            }
                            break;
                        case 'v':
                            if (board[currentY + 1][currentX] === '#') {
                                board[currentY][currentX] = '<';
                            }
                            else {
                                board[currentY][currentX] = '.';
                                currentY++;
                                board[currentY][currentX] = 'v';
                            }
                            break;
                        case '>':
                            if (board[currentY][currentX + 1] === '#') {
                                board[currentY][currentX] = 'v';
                            }
                            else {
                                board[currentY][currentX] = '.';
                                currentX++;
                                board[currentY][currentX] = '>';
                            }
                            break;
                        case '<':
                            if (board[currentY][currentX - 1] === '#') {
                                board[currentY][currentX] = '^';
                            }
                            else {
                                board[currentY][currentX] = '.';
                                currentX--;
                                board[currentY][currentX] = '<';
                            }
                            break;
                        default:
                            guardInBoard = false;
                            break;
                    }

                    currentTime = Date.now();
                }

                board[j][i] = '.';
                // if it took more than 1 milliseconds consider a loop
                if (currentTime > startTime + TIME_FOR_LOOP) {
                    numOfLoops++;
                }
            }
        }
    }

    return numOfLoops;
}

export default run;
