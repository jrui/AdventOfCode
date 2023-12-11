import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day06/input/input2.txt', 'utf-8').split('\n');
    const time = parseInt(lines[0].split('Time: ')[1]);
    const distance = parseInt(lines[1].split('Distance: ')[1]);

    let points = [];
    for (let i = 0; i < time; i++) {
        if (i * (time - i) > distance) {
            points.push(i * (time - i));
        }
    }

    return points.length;
}

export default run;
  
