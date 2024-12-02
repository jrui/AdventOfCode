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
    for (let k = 0; k < lines.length; k += 3) {
        let line1: string = lines[k];
        let line2: string = lines[k + 1];
        let line3: string = lines[k + 2];

        let firstLineLetters: Record<string, number> = {};
        let secondLineLetters: Record<string, number> = {};
        let thirdLineLetters: Record<string, number> = {};

        for (let i = 0; i < line1.length; i++) {
            firstLineLetters[line1.charAt(i)] = (firstLineLetters[line1.charAt(i)] || 0) + 1;
        }
        for (let i = 0; i < line2.length; i++) {
            secondLineLetters[line2.charAt(i)] = (secondLineLetters[line2.charAt(i)] || 0) + 1;
        }
        for (let i = 0; i < line3.length; i++) {
            thirdLineLetters[line3.charAt(i)] = (thirdLineLetters[line3.charAt(i)] || 0) + 1;
        }

        // find matching key common for both firstHalfLetters and secondHalfLetters
        let matchingKey: string = '';
        for (const key in firstLineLetters) {
            if (secondLineLetters.hasOwnProperty(key) && thirdLineLetters.hasOwnProperty(key)) {
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



console.log(solution());
export { solution };