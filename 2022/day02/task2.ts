import * as fs from 'fs';

enum AdversaryPlay {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C'
}
enum Outcome {
    LOSE = 'X',
    DRAW = 'Y',
    WIN = 'Z'
}


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    return file.split('\n');
}

function solution(): number {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    let totalScore: number = 0;
    // @ts-ignore
    for (let i = 0; i < lines.length; i++) {
        // @ts-ignore
        const [advPlay, outcome] = lines[i].split(' ');

        switch (advPlay) {
            case AdversaryPlay.ROCK:
                if (outcome === Outcome.LOSE) {
                    totalScore += 3 + 0;
                }
                if (outcome === Outcome.DRAW) {
                    totalScore += 1 + 3;
                }
                if (outcome === Outcome.WIN) {
                    totalScore += 2 + 6;
                }
                break;

            case AdversaryPlay.PAPER:
                if (outcome === Outcome.LOSE) {
                    totalScore += 1 + 0;
                }
                if (outcome === Outcome.DRAW) {
                    totalScore += 2 + 3;
                }
                if (outcome === Outcome.WIN) {
                    totalScore += 3 + 6;
                }
                break;

            case AdversaryPlay.SCISSORS:
                if (outcome === Outcome.LOSE) {
                    totalScore += 2 + 0;
                }
                if (outcome === Outcome.DRAW) {
                    totalScore += 3 + 3;
                }
                if (outcome === Outcome.WIN) {
                    totalScore += 1 + 6;
                }
                break;

            default:
                break;
        }
    }

    // Write your code
    return totalScore;
}


console.log(solution());
export { solution };
