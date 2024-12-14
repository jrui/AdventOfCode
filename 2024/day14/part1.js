import { readFileSync } from 'fs';
import { Robot } from './Robot.js';


function run() {
    let robots = readFileSync('./day14/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => [line.split(' ')[0].split('=')[1], line.split(' ')[1].split('=')[1]])
        .map(robot => robot.map(coords => coords.split(',').map(coord => parseInt(coord))))
        .map(robot => new Robot(robot[0][0], robot[0][1], robot[1][0], robot[1][1]));

    // robots = [ robots[10] ];
    const NUM_SECONDS = 100;
    for (let i = 0; i < NUM_SECONDS; i++) {
        robots.map(robot => robot.move());
    }

    let q1 = robots.filter(robot => robot.getQuadrant() === 1);
    let q2 = robots.filter(robot => robot.getQuadrant() === 2);
    let q3 = robots.filter(robot => robot.getQuadrant() === 3);
    let q4 = robots.filter(robot => robot.getQuadrant() === 4);

    return q1.length * q2.length * q3.length * q4.length;
}

export default run;
  
