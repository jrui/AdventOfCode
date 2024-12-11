import { readFileSync } from 'fs';


function blink(stones) {
    const newStones = {};

    Object
        .entries(stones)
        .filter(([_, count]) => count > 0)
        .map(([stone, count]) => {
            let digitCount = `${stone}`.length;
            if (stone == 0) {
                newStones[1] 
                    ? newStones[1] += count
                    : newStones[1] = count;
            }
            else if (digitCount % 2 === 0) {
                newStones[Number(`${stone}`.slice(0, digitCount / 2))]
                    ? newStones[Number(`${stone}`.slice(0, digitCount / 2))] += count
                    : newStones[Number(`${stone}`.slice(0, digitCount / 2))] = count;
                newStones[Number(`${stone}`.slice(digitCount / 2))]
                    ? newStones[Number(`${stone}`.slice(digitCount / 2))] += count
                    : newStones[Number(`${stone}`.slice(digitCount / 2))] = count;
            }
            else {
                newStones[stone * 2024]
                    ? newStones[Number(stone * 2024)] += count
                    : newStones[Number(stone * 2024)] = count;
            }
        });
 
    return newStones;
}


function run() {
    let stones = readFileSync('./day11/input/input2.txt', 'utf-8')
        .split('\n')[0]
        .split(' ')
        .map(Number);

    let stoneMap = new Map();
    stones.map(stone => {
        if (stoneMap.has(stone)) {
            stoneMap[stone] += 1;
        }
        else stoneMap[stone] = 1;
    });

    const nBlinks = 75;
    for (let i = 0; i < nBlinks; i++) {
        stoneMap = blink(stoneMap);
        // console.log('Blink', i + 1, 'has map', stoneMap);
    }

    return Object
        .values(stoneMap)
        .reduce((acc, count) => acc + count, 0);
}

export default run;