import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day04/input/input1.txt', 'utf-8').split('\n');
    let score = 0;

    lines.forEach(line => {
        const [cardIdString, gameNumbersString] = line.split(':');
        const cardId = parseInt(cardIdString.replaceAll(/Card\ */g, ''));
        const [winningNumberString, chosenNumberString] = gameNumbersString.split('|');
        let winningNumbers = winningNumberString.split(' ').filter(v => v.length).map(n => parseInt(n));
        let chosenNumbers = chosenNumberString.split(' ').filter(v => v.length).map(n => parseInt(n));

        let rowScore = 0;
        chosenNumbers.forEach(chosenNumber => {
            if (winningNumbers.includes(chosenNumber)) {
                if (rowScore === 0) rowScore = 1;
                else rowScore *= 2;
            }
        });

        score += rowScore;
    });

    return score;
}

export default run;
  
