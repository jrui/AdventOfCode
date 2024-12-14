import { readFileSync, writeFileSync } from 'fs';
import { Robot } from './Robot.js';


function printBoard(robots, iteration) {
    let board = new Array(103).fill(0).map(() => new Array(101).fill('.'));
    robots.map(robot => board[robot.y][robot.x] = '#');
    board.map(row => writeFileSync(
        `./day14/output/iteration_${iteration}.txt`,
        row.join('') + '\n',
        { flag: 'a' }
    ));
}


function run() {
    let robots = readFileSync('./day14/input/input2.txt', 'utf-8')
        .split('\n')
        .map(line => [line.split(' ')[0].split('=')[1], line.split(' ')[1].split('=')[1]])
        .map(robot => robot.map(coords => coords.split(',').map(coord => parseInt(coord))))
        .map(robot => new Robot(robot[0][0], robot[0][1], robot[1][0], robot[1][1]));

    const NUM_SECONDS = 1000000000;
    let i = 0;
    while (true) {
        robots.map(robot => robot.move());
        printBoard(robots, i + 1);
        i++;
    }

    // I checked file miniatures because looking for a patter wouldn't work
    // 1 - Matrix symetry didn't work for up to 10 Million iterations
    // 2 - Checking for first line habing 1 # and following +2 didnt work
    return i;
}

export default run;
  
