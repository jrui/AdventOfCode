import { readFileSync } from 'fs';


function checkMirrorInArray(array) {
    let reflectionYIndex = -1;
    for (let y = 0; reflectionYIndex === -1 && y < array.length - 1; y++) {
        if (array[y] === array[y + 1]) {
            // check for consecutive identical rows
            let firstHalfArray = array.slice(0, y + 1);
            let secondHalfArray = array.slice(y + 1, array.length);
            let sizeTrim = Math.min(firstHalfArray.length, secondHalfArray.length);
            while (firstHalfArray.length > sizeTrim) firstHalfArray.shift();
            while (secondHalfArray.length > sizeTrim) secondHalfArray.pop();
            secondHalfArray = secondHalfArray.reverse();

            if (firstHalfArray.every((value, index) => value === secondHalfArray[index])) {
                reflectionYIndex = y;
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
                reflectionYIndex = y + 1;
            }
        }
    }

    return reflectionYIndex;
}


function transposeMatrix(matrix) {
    return matrix.reduce((prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])), []);
}


function run() {
    const boards = readFileSync('./day13/input/input1.txt', 'utf-8').split('\n\n');
    
    let sum = 0;
    boards.forEach(board => {
        const boardArray = board.split('\n');
        let reflectionYIndex = checkMirrorInArray(boardArray);

        if (reflectionYIndex !== -1) {
            sum += 100 * (reflectionYIndex + 1);
        }
        else {
            const boardArrayTranspose = transposeMatrix(boardArray.map(l => l.split(''))).map(l => l.join(''));
            let reflectionXIndex = checkMirrorInArray(boardArrayTranspose);

            sum += reflectionXIndex + 1;
        }
    });

    return sum;
}

export default run;
  
