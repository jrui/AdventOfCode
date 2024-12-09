import { log } from 'console';
import { readFileSync } from 'fs';
import { BlockList } from 'net';


function expandInstruction(instruction) {
    let deconstructedInstruction = [];
    let currentIndex = 0;
    for (let i = 0; i < instruction.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < instruction[i]; j++) {
                deconstructedInstruction.push(currentIndex);
            }
            currentIndex++;
        }
        else {
            for (let j = 0; j < instruction[i]; j++) {
                deconstructedInstruction.push('.');
            }
        }
    }

    return deconstructedInstruction;
}


function run() {
    const lines = readFileSync('./day09/input/input2.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''))[0]
        .map(Number);

    let deconstructedInstruction = expandInstruction(lines);
    let currentBlockSize = 1;
    for (let j = deconstructedInstruction.length - 1; j > 0; j--) {
        while (
            j > 0
            && deconstructedInstruction[j] === deconstructedInstruction[j - 1]
        ) {
            currentBlockSize++;
            j--;
        }

        let foundEnoughMemory = false;
        let insertionBlockSpace = 0;
        for (let i = 0; i < j && !foundEnoughMemory; i++) {
            if (deconstructedInstruction[i] === '.') {
                insertionBlockSpace++;
                if (insertionBlockSpace >= currentBlockSize) {
                    foundEnoughMemory = true;

                    for (let k = 0; k < currentBlockSize; k++) {
                        deconstructedInstruction[i - k] = deconstructedInstruction[j + k];
                        deconstructedInstruction[j + k] = '.';
                    }
                }
            }
            else {
                insertionBlockSpace = 0;
            }
        }

        currentBlockSize = 1;
    }

    return deconstructedInstruction
        .map((value, index) => value !== '.' ? value * index : 0)
        .reduce((acc, value) => acc + value, 0);
}

export default run;