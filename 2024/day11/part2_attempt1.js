import { readFileSync } from 'fs';
import { LinkedList } from 'structalgo';


function blink(stones) {
    const newStones = new LinkedList();

    for (let i = 0; i < stones.length; i++) {
        let digitCount = `${stones.get(i)}`.length;

        if (stones.get(i) === 0) {
            newStones.push(1);
        }
        else if (digitCount % 2 === 0) {
            newStones.push(Number(`${Number(stones.get(i))}`.slice(0, digitCount / 2)));
            newStones.push(Number(`${Number(stones.get(i))}`.slice(digitCount / 2, digitCount)));
        }
        else {
            newStones.push(Number(stones.get(i)) * 2024);
        }
    }
 
    return newStones;
}


function run() {
    let stones = new LinkedList();
    readFileSync('./day11/input/input2.txt', 'utf-8')
        .split('\n')[0]
        .split(' ')
        .map(number => stones.push(Number(number)));

    const nBlinks = 75;
    for (let i = 0; i < nBlinks; i++) {
        stones = blink(stones);
        console.log('Blink', i + 1, 'has lenght of', stones.length);
    }

    return stones.length;
}

export default run;
  