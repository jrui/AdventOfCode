import { readFileSync } from 'fs';


function blink(stones) {
    const newStones = [];
 
    for (let i = 0; i < stones.length; i++) {
        let digitCount = `${stones[i]}`.length;

        if (stones[i] === 0) {
            newStones.push(1);
        }
        else if (digitCount % 2 === 0) {
            newStones.push(Number(`${stones[i]}`.slice(0, digitCount / 2)));
            newStones.push(Number(`${stones[i]}`.slice(digitCount / 2, digitCount)));
        }
        else {
            newStones.push(stones[i] * 2024);
        }
    }
 
    return newStones;
}


function run() {
    let stones = readFileSync('./day11/input/input1.txt', 'utf-8')
        .split('\n')[0]
        .split(' ')
        .map(Number);
    // console.log('Initial stones', stones);

    const nBlinks = 25;
    for (let i = 0; i < nBlinks; i++) {
        stones = blink(stones);
        // console.log('Blink', i + 1, stones);
    }

    return stones.length;
}

export default run;
  
