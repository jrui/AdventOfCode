import { readFileSync, writeFileSync } from 'fs';


function rewritePrettyFile() {
    // updates characters to be more readable
    const lines = readFileSync('./day10/input/input2.txt', 'utf-8').split('\n')
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
                case '|':
                    return '│';
                case '-':
                    return '─';
                default:
                    return char;
            }
        }).join('');
    });

    writeFileSync('./day10/input/input2_pretty.txt', prettyLines.join('\n'));
}


function rewritePrettyFileNoTrash() {
    // reduces noise by taking out all the points that are not part of the path
    const lines = readFileSync('./day10/input/input2_pretty.txt', 'utf-8').split('\n')
    const lineMatrix = lines.map(line => line.split(''));

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
    let path = [];
    // we can start by going either down or right. Let's go down
    startingY += 1;
    let cameFrom = 'U';
    path.push(`${startingX},${startingY}`);
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
            case '─':
                if (cameFrom === 'R') {
                    startingX -= 1;
                    cameFrom = 'R';
                } else if (cameFrom === 'L') {
                    startingX += 1;
                    cameFrom = 'L';
                }
                break;
            case '│':
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
                break;
        }
        path.push(`${startingX},${startingY}`);
    }
    // remove duplicate starting coordinates
    path = [... new Set(path)];

    const prettyLines = lines.map((line, indexY) => {
        return line.split('').map((char, indexX) => {
            if (path.indexOf(`${indexX},${indexY}`) !== -1) {
                return char;
            }
            else return '.';
        }).join('');
    });

    writeFileSync('./day10/input/input2_pretty_no_trash.txt', prettyLines.join('\n'));
}


function upIsOutside(lineMatrix, x, y) {
    // for all spaces above x in matrix, check if character is '.'
    for (let j = 0; j < y; j++) {
        if (lineMatrix[j][x] !== '.') {
            return false;
        }
    }
    return true;
}


function leftIsOutside(lineMatrix, x, y) {
    // for all spaces to the left of y in matrix, check if character is '.'
    for (let i = 0; i < x; i++) {
        if (lineMatrix[y][i] !== '.') {
            return false;
        }
    }
    return true;
}


function downIsOutside(lineMatrix, x, y) {
    // for all spaces below x in matrix, check if character is '.'
    for (let j = y + 1; j < lineMatrix.length; j++) {
        if (lineMatrix[j][x] !== '.') {
            return false;
        }
    }
    return true;
}


function rightIsOutside(lineMatrix, x, y) {
    // for all spaces to the right of y in matrix, check if character is '.'
    for (let i = x + 1; i < lineMatrix[y].length; i++) {
        if (lineMatrix[y][i] !== '.') {
            return false;
        }
    }
    return true;
}



function run() {
    const lines = readFileSync('./day10/input/input2_pretty_no_trash.txt', 'utf-8').split('\n');
    const lineMatrix = lines.map(line => line.split(''));
    // rewritePrettyFile()
    // rewritePrettyFileNoTrash();

    for (let j = 0; j < 100; j++) {
        // iterate from up to down, left to right
        for (let y = 0; y < lineMatrix.length; y++) {
            for (let x = 0; x < lineMatrix[y].length; x++) {
                if (lineMatrix[y][x] === '┌' && lineMatrix[y][x+1] === '┐' && upIsOutside(lineMatrix, x, y) && upIsOutside(lineMatrix, x+1, y)) {
                    if (lineMatrix[y+1][x] === '│' && lineMatrix[y+1][x+1] === '│') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y+1][x] = '┌';
                        lineMatrix[y+1][x+1] = '┐';
                    } else if (lineMatrix[y+1][x] === '┘' && lineMatrix[y+1][x+1] === '└') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y+1][x] = '─';
                        lineMatrix[y+1][x+1] = '─';
                    } else if (lineMatrix[y+1][x] === '┘' && lineMatrix[y+1][x+1] === '│') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y+1][x] = '─';
                        lineMatrix[y+1][x+1] = '┐';
                    } else if (lineMatrix[y+1][x] === '│' && lineMatrix[y+1][x+1] === '└') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y+1][x] = '┌';
                        lineMatrix[y+1][x+1] = '─';
                    }
                }
            }
        }

        // iterate from left to right, up to down
        for (let x = 0; x < lineMatrix[0].length; x++) {
            for (let y = 0; y < lineMatrix.length; y++) {
                if (lineMatrix[y][x] === '┌' && lineMatrix[y+1][x] === '└'  && leftIsOutside(lineMatrix, x, y) && leftIsOutside(lineMatrix, x, y+1)) {
                    if (lineMatrix[y][x+1] === '─' && lineMatrix[y+1][x+1] === '─') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x+1] = '┌';
                        lineMatrix[y+1][x+1] = '└';
                    } else if (lineMatrix[y][x+1] === '┘' && lineMatrix[y+1][x+1] === '┐') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x+1] = '│';
                        lineMatrix[y+1][x+1] = '│';
                    } else if (lineMatrix[y][x+1] === '┘' && lineMatrix[y+1][x+1] === '─') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x+1] = '│';
                        lineMatrix[y+1][x+1] = '└';
                    } else if (lineMatrix[y][x+1] === '─' && lineMatrix[y+1][x+1] === '┐') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x+1] = '┌';
                        lineMatrix[y+1][x+1] = '│';
                    }
                }
            }
        }

        // iterate from down to up, left to right
        for (let y = lineMatrix.length - 1; y > 0; y--) {
            for (let x = 0; x < lineMatrix[y].length; x++) {
                if (lineMatrix[y][x] === '└' && lineMatrix[y][x+1] === '┘' && downIsOutside(lineMatrix, x, y) && downIsOutside(lineMatrix, x+1, y)) {
                    if (lineMatrix[y-1][x] === '│' && lineMatrix[y-1][x+1] === '│') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y-1][x] = '└';
                        lineMatrix[y-1][x+1] = '┘';
                    } else if (lineMatrix[y-1][x] === '┐' && lineMatrix[y-1][x+1] === '┌') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y-1][x] = '─';
                        lineMatrix[y-1][x+1] = '─';
                    } else if (lineMatrix[y-1][x] === '┐' && lineMatrix[y-1][x+1] === '│') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y-1][x] = '─';
                        lineMatrix[y-1][x+1] = '┘';
                    } else if (lineMatrix[y-1][x] === '│' && lineMatrix[y-1][x+1] === '┌') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y][x+1] = '.';
                        lineMatrix[y-1][x] = '└';
                        lineMatrix[y-1][x+1] = '─';
                    }
                }
            }
        }

        // iterate from right to left, up to down
        for (let x = lineMatrix[0].length - 1; x > 0; x--) {
            for (let y = 0; y < lineMatrix.length; y++) {
                if (lineMatrix[y][x] === '┐' && lineMatrix[y+1][x] === '┘' && rightIsOutside(lineMatrix, x, y) && rightIsOutside(lineMatrix, x, y+1)) {
                    if (lineMatrix[y][x-1] === '─' && lineMatrix[y+1][x-1] === '─') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x-1] = '┐';
                        lineMatrix[y+1][x-1] = '┘';
                    } else if (lineMatrix[y][x-1] === '└' && lineMatrix[y+1][x-1] === '┌') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x-1] = '│';
                        lineMatrix[y+1][x-1] = '│';
                    } else if (lineMatrix[y][x-1] === '└' && lineMatrix[y+1][x-1] === '─') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x-1] = '│';
                        lineMatrix[y+1][x-1] = '┘';
                    } else if (lineMatrix[y][x-1] === '─' && lineMatrix[y+1][x-1] === '┌') {
                        lineMatrix[y][x] = '.';
                        lineMatrix[y+1][x] = '.';
                        lineMatrix[y][x-1] = '┐';
                        lineMatrix[y+1][x-1] = '│';
                    }
                }
            }
        }
    }

    writeFileSync('./day10/input/input2_pretty_iter2.txt', lineMatrix.map(line => line.join('')).join('\n'));

    return 0;
}

export default run;
  
