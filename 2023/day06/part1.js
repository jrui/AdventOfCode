import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day06/input/input1.txt', 'utf-8').split('\n');
    const times = lines[0].split('Time: ')[1].split(' ').map(time => parseInt(time));
    const distances = lines[1].split('Distance: ')[1].split(' ').map(distance => parseInt(distance));

    let sum = 1;
    times.forEach((time, index) => {
        let points = [];
        for (let i = 0; i < time; i++) {
            points.push(i * (time - i));
        }

        sum *= points.filter(point => point > distances[index]).length;
    })

    return sum;
}

export default run;
  
