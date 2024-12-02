import { readFileSync } from 'fs';


function checkMirrorInArray(array, differentToCheck = null) {
    let reflectionIndex = -1;
    for (let y = 0; reflectionIndex === -1 && y < array.length - 1; y++) {
        if (array[y] === array[y + 1]) {
            // check for consecutive identical rows
            let firstHalfArray = array.slice(0, y + 1);
            let secondHalfArray = array.slice(y + 1, array.length);
            let sizeTrim = Math.min(firstHalfArray.length, secondHalfArray.length);
            while (firstHalfArray.length > sizeTrim) firstHalfArray.shift();
            while (secondHalfArray.length > sizeTrim) secondHalfArray.pop();
            secondHalfArray = secondHalfArray.reverse();

            if (firstHalfArray.every((value, index) => value === secondHalfArray[index])) {
                if (differentToCheck) {
                    if (differentToCheck !== y) reflectionIndex = y;
                }
                else reflectionIndex = y;
            }
        }
        else if (y < array.length - 2 && array[y] === array[y + 2]) {
            // check for rows with 1 different unique row in between
            let firstHalfArray = array.slice(0, y + 2);
            let secondHalfArray = array.slice(y + 1, array.length);
            let sizeTrim = Math.min(firstHalfArray.length, secondHalfArray.length);
            while (firstHalfArray.length > sizeTrim) firstHalfArray.shift();
            while (secondHalfArray.length > sizeTrim) secondHalfArray.pop();
            secondHalfArray = secondHalfArray.reverse();

            if (firstHalfArray.every((value, index) => value === secondHalfArray[index])) {
                if (differentToCheck) {
                    if (differentToCheck !== y) reflectionIndex = y + 1;
                }
                else reflectionIndex = y + 1;
            }
        }
    }

    return reflectionIndex;
}


function transposeMatrix(matrix) {
    return matrix.reduce((prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])), []);
}


function run() {
    const boards = readFileSync('./day13/input/input2.txt', 'utf-8').split('\n\n');
    
    let sum = 0;
    boards.forEach((board, index) => {
        const boardArray = board.split('\n');
        let originalReflectionYIndex = checkMirrorInArray(boardArray);
        const boardArrayTranspose = transposeMatrix(boardArray.map(l => l.split(''))).map(l => l.join(''));
        let originalReflectionXIndex = checkMirrorInArray(boardArrayTranspose);

        const boardMatrix = board.split('\n').map(l => l.split(''));
        let foundNewReflexion = false;
        for (let y = 0; !foundNewReflexion && y < boardMatrix.length; y++) {
            for (let x = 0; !foundNewReflexion && x < boardMatrix[y].length; x++) {
                if (boardMatrix[y][x] === '.') {
                    // console.log('changing', boardMatrix[y].join(''));
                    boardMatrix[y][x] = '#';
                    // console.log('to\t', boardMatrix[y].join(''));
                } else {
                    // console.log('changing', boardMatrix[y].join(''));
                    boardMatrix[y][x] = '.';
                    // console.log('to\t', boardMatrix[y].join(''));
                }

                let boardArray = boardMatrix.map(l => l.join(''));
                let reflectionYIndex = checkMirrorInArray(boardArray, originalReflectionYIndex);
                if (reflectionYIndex !== -1) {
                    sum += 100 * (reflectionYIndex + 1);
                    foundNewReflexion = true;
                    console.log('Found a new reflexion for board', index, 'original reflection was X,Y', originalReflectionXIndex, originalReflectionYIndex, 'new is Y', reflectionYIndex, 'changed line', y, 'to', boardMatrix[y].join(''))
                }
                else {
                    const boardArrayTranspose = transposeMatrix(boardMatrix).map(l => l.join(''));
                    let reflectionXIndex = checkMirrorInArray(boardArrayTranspose, originalReflectionXIndex);

                    if (reflectionXIndex !== -1) {
                        sum += reflectionXIndex + 1;
                        foundNewReflexion = true;
                        console.log('Found a new reflexion for board', index, 'original reflection was X, Y', originalReflectionXIndex, originalReflectionYIndex, 'new is X ', reflectionXIndex, 'changed line', y, 'to', boardMatrix[y].join(''))
                    }
                }

                if (!foundNewReflexion) {
                    if (boardMatrix[y][x] === '.') {
                        boardMatrix[y][x] = '#';
                    } else {
                        boardMatrix[y][x] = '.';
                    }
                }
            }
        }
    });

    return sum;
}

export default run;