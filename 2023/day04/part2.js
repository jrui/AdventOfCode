import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day04/input/input2.txt', 'utf-8').split('\n');
    const ORIGINAL_SCRATCHCARD_COUNT = lines.length;

    let scratchcards = {};
    let scratchcardCount = 0;

    for (let i = 0; i < ORIGINAL_SCRATCHCARD_COUNT; i++) {
        scratchcards[i] = {
            cards: 1
        };
    }

    for (let i = 0; i < ORIGINAL_SCRATCHCARD_COUNT; i++) {
        const [_, gameNumbersString] = lines[i].split(':');
        const [winningNumberString, chosenNumberString] = gameNumbersString.split('|');
        let winningNumbers = winningNumberString.split(' ').filter(v => v.length).map(n => parseInt(n));
        let chosenNumbers = chosenNumberString.split(' ').filter(v => v.length).map(n => parseInt(n));

        let rowScore = 0;
        chosenNumbers.forEach(chosenNumber => {
            if (winningNumbers.includes(chosenNumber)) {
                rowScore++;
            }
        });

        while (rowScore > 0) {
            if (i + rowScore < ORIGINAL_SCRATCHCARD_COUNT) {
                scratchcards[i + rowScore] = {
                    cards: scratchcards[i + rowScore].cards + scratchcards[i].cards
                };
            }
            rowScore--;
        }
    }

    scratchcardCount = Object.values(scratchcards).reduce((acc, scratchcard) => {
        return acc + scratchcard.cards;
    }, 0);

    // console.log('Scratchcards:', scratchcards);
    // 10 212 704
    return scratchcardCount;
}

export default run;
  
