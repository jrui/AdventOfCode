import { readFileSync, writeFileSync } from 'fs';


function rewritePrettyFile() {
    const lines = readFileSync('./day10/input/input1.txt', 'utf-8').split('\n')
    const prettyLines = lines.map(line => {
        return line.split('').map(char => {
            switch (char) {
                case '7':
                    return '┐';
                case 'J':
                    return '┘';
                case 'L':
                    return '└';
                case 'F':
                    return '┌';
                default:
                    return char;
            }
        }).join('');
    });

    writeFileSync('./day10/input/input1_pretty.txt', prettyLines.join('\n'));
}


function run() {
    const lines = readFileSync('./day10/input/input1_pretty.txt', 'utf-8').split('\n');
    const lineMatrix = lines.map(line => line.split(''));
    // rewritePrettyFile()

    // finding initial coordinates
    let startingX = 0;
    let startingY = 0;
    lines.forEach((line, yIndex) => line.split('').forEach((char, xIndex) => {
        if (char === 'S') {
            startingX = xIndex;
            startingY = yIndex;
        }
    }));

    let hasFinished = false;
    // we can start by going either down or right. Let's go down
    startingY += 1;
    let cameFrom = 'U';
    let steps = 1;
    while (!hasFinished) {
        switch (lineMatrix[startingY][startingX]) {
            case '┐':
                if (cameFrom === 'D') {
                    startingX -= 1;
                    cameFrom = 'R';
                } else if (cameFrom === 'L') {
                    startingY += 1;
                    cameFrom = 'U';
                }
                break;
            case '┘':
                if (cameFrom === 'U') {
                    startingX -= 1;
                    cameFrom = 'R';
                } else if (cameFrom === 'L') {
                    startingY -= 1;
                    cameFrom = 'D';
                }
                break;
            case '└':
                if (cameFrom === 'U') {
                    startingX += 1;
                    cameFrom = 'L';
                } else if (cameFrom === 'R') {
                    startingY -= 1;
                    cameFrom = 'D';
                }
                break;
            case '┌':
                if (cameFrom === 'D') {
                    startingX += 1;
                    cameFrom = 'L';
                } else if (cameFrom === 'R') {
                    startingY += 1;
                    cameFrom = 'U';
                }
                break;
            case '-':
                if (cameFrom === 'R') {
                    startingX -= 1;
                    cameFrom = 'R';
                } else if (cameFrom === 'L') {
                    startingX += 1;
                    cameFrom = 'L';
                }
                break;
            case '|':
                if (cameFrom === 'U') {
                    startingY += 1;
                    cameFrom = 'U';
                } else if (cameFrom === 'D') {
                    startingY -= 1;
                    cameFrom = 'D';
                }
                break;
            case 'S':
                hasFinished = true;
                steps -= 1;
                break;
        }
        steps += 1;
    }

    // console.log('Reached the end in ', steps, ' steps');
    // console.log('Most distant point from start is ', Math.ceil(steps / 2), ' steps away');
    return Math.ceil(steps / 2);
}

export default run;
  
