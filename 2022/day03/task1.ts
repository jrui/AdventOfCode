import * as fs from 'fs';

function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


function isLowerCase(char: string): boolean {
    return char === char.toLowerCase();
}


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    let totalScore: number = 0;
    for (let k = 0; k < lines.length; k++) {
        let line: string = lines[k];
        console.log('line: ' + line);

        let firstHalfLetters: Record<string, number> = {};
        let secondHalfLetters: Record<string, number> = {};

        for (let i = 0; i < line.length / 2; i++) {
            firstHalfLetters[line.charAt(i)] = (firstHalfLetters[line.charAt(i)] || 0) + 1;
        }
        console.log(firstHalfLetters);

        for (let j = line.length / 2; j < line.length; j++) {
            secondHalfLetters[line.charAt(j)] = (secondHalfLetters[line.charAt(j)] || 0) + 1;
        }
        console.log(secondHalfLetters);

        // find matching key common for both firstHalfLetters and secondHalfLetters
        let matchingKey: string = '';
        for (const key in firstHalfLetters) {
            if (secondHalfLetters.hasOwnProperty(key)) {
                matchingKey = key;
                break;
            }
        }


        console.log('Matching key: ' + matchingKey);
        const asciiCode: number = isLowerCase(matchingKey) ?
            matchingKey.charCodeAt(0) - 96:
            matchingKey.charCodeAt(0) - 38;
        console.log('Ascii code: ' + asciiCode);
        totalScore += asciiCode;
    }


    // Write your code
    return totalScore;
}



// console.log(solution());
export { solution };

