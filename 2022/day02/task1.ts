import * as fs from 'fs';

enum AdversaryPlay {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C'
}
enum MyPlay {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z'
}


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    return file.split('\n');
}

function solution(): number {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    let totalScore: number = 0;
    for (let i = 0; i < lines.length; i++) {
        const [advPlay, myPlay] = lines[i].split(' ');

        switch (advPlay) {
            case AdversaryPlay.ROCK:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 3;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 6;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 0;
                }
                break;

            case AdversaryPlay.PAPER:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 0;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 3;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 6;
                }
                break;

            case AdversaryPlay.SCISSORS:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 6;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 0;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 3;
                }
                break;

            default:
                break;
        }
    }

    // Write your code
    return totalScore;
}


// console.log(solution());
export { solution };

