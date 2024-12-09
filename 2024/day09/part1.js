import { readFileSync } from 'fs';


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
    const lines = readFileSync('./day09/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''))[0]
        .map(Number);

    let deconstructedInstruction = expandInstruction(lines);
    for (let i = 0; i < deconstructedInstruction.length; i++) {
        for (let j = deconstructedInstruction.length - 1; j > i; j--) {
            if (deconstructedInstruction[i] === '.' && deconstructedInstruction[j] !== '.') {
                deconstructedInstruction[i] = deconstructedInstruction[j];
                deconstructedInstruction[j] = '.';
            }
        }
    }

    return deconstructedInstruction
        .map((value, index) => value !== '.' ? value * index : 0)
        .reduce((acc, value) => acc + value, 0);
}

export default run;