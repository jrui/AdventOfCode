import { readFileSync } from 'fs';

const MULTIPLIER_BASE = 10000000000;


function cardCompare(a, b) {
    let cardA = a === 'A' ?
        14 : a === 'K' ?
            13 : a === 'Q' ?
                12 : a === 'J' ?
                    11 : a === 'T' ?
                        10 : parseInt(a)
    
    let cardB = b === 'A' ?
        14 : b === 'K' ?
            13 : b === 'Q' ?
                12 : b === 'J' ?
                    11 : b === 'T' ?
                        10 : parseInt(b)
    
    return cardB - cardA;
}

function sortHand(hand) {
    // sorts all cards in hand from highest to lowest
    return hand.split('').sort((a, b) => cardCompare(a, b)).join('');
}

function cardToNumberText(a) {
    return a === 'A' ?
        '14' : a === 'K' ?
            '13' : a === 'Q' ?
                '12' : a === 'J' ?
                    '11' : a === 'T' ?
                        '10' : '0' + a;
}


function run() {
    const lines = readFileSync('./day07/input/input1.txt', 'utf-8').split('\n');
    let handMap = lines.map(line => {
        const [hand, bet] = line.split(' ');
        let obj = {};
        
        hand.split('').forEach(card => {
            if (obj[card]) {
                obj[card] += 1;
            } else {
                obj[card] = 1;
            }
        });

        return {
            ... obj,
            bet: parseInt(bet),
            score: 0,
            hand
        };
    });

    handMap = handMap.map(hand => {
        // multiplier:
        // 0: high card
        // 1: one pair
        // 2: two pair
        // 3: trio
        // 4: full house
        // 5: four of a kind
        // 6: poker
        let score = 0;
        let cards = Object.keys(hand).splice(0, Object.keys(hand).length - 3);

        switch (cards.length) {
            case 1:
                // poker
                score = 6 * MULTIPLIER_BASE + parseInt(
                    cardToNumberText(cards[0]) +
                    cardToNumberText(cards[0]) +
                    cardToNumberText(cards[0]) +
                    cardToNumberText(cards[0]) +
                    cardToNumberText(cards[0])
                );
                break;
            case 2:
                if (hand[cards[0]] === 4) {
                    // four of a kind
                    score = 5 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[1])
                    );


                console.log(hand, score)
                } else if (hand[cards[0]] === 1) {
                    // four of a kind
                    score = 5 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[0])
                    );


                console.log(hand, score)
                } else {
                    // full house
                    if (hand[cards[0]] === 3) {
                        score = 4 * MULTIPLIER_BASE + parseInt(
                            cardToNumberText(cards[0]) +
                            cardToNumberText(cards[0]) +
                            cardToNumberText(cards[0]) +
                            cardToNumberText(cards[1]) +
                            cardToNumberText(cards[1])
                        );
                    }
                    else {
                        score = 4 * MULTIPLIER_BASE + parseInt(
                            cardToNumberText(cards[1]) +
                            cardToNumberText(cards[1]) +
                            cardToNumberText(cards[1]) +
                            cardToNumberText(cards[0]) +
                            cardToNumberText(cards[0])
                        );
                    }
                }
                break;
            case 3:
                if (hand[cards[0]] === 3) {
                    // trio with first
                    score = 3 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        cardCompare(cards[1], cards[2]) <= 0 ?
                            cardToNumberText(cards[1]) + cardToNumberText(cards[2]) :
                            cardToNumberText(cards[2]) + cardToNumberText(cards[1])
                    );
                } else if (hand[cards[0]] === 2) {
                    // two pair with first
                    if (hand[cards[1]] === 2) {
                        // two pair with first and second
                        score = 2 * MULTIPLIER_BASE + parseInt(
                            (
                                cardCompare(cards[0], cards[1]) <= 0 ?
                                    cardToNumberText(cards[0]) + cardToNumberText(cards[0]) + cardToNumberText(cards[1]) + cardToNumberText(cards[1]) :
                                    cardToNumberText(cards[1]) + cardToNumberText(cards[1]) + cardToNumberText(cards[0]) + cardToNumberText(cards[0])
                            ) +
                            cardToNumberText(cards[2])
                        );
                    }
                    else {
                        // two pair with first and third
                        score = 2 * MULTIPLIER_BASE + parseInt(
                            (
                                cardCompare(cards[0], cards[2]) <= 0 ?
                                    cardToNumberText(cards[0]) + cardToNumberText(cards[0]) + cardToNumberText(cards[2]) + cardToNumberText(cards[2]) :
                                    cardToNumberText(cards[2]) + cardToNumberText(cards[2]) + cardToNumberText(cards[0]) + cardToNumberText(cards[0])
                            ) +
                            cardToNumberText(cards[1])
                        );

                    }
                } else if (hand[cards[1]] === 3) {
                    // trio on second
                    score = 3 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        cardCompare(cards[0], cards[2]) <= 0 ?
                            cardToNumberText(cards[0]) + cardToNumberText(cards[2]) :
                            cardToNumberText(cards[2]) + cardToNumberText(cards[0])
                    );
                } else if (hand[cards[2]] === 3) {
                    // trio on third
                    score = 3 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[2]) +
                        cardToNumberText(cards[2]) +
                        cardToNumberText(cards[2]) +
                        cardCompare(cards[0], cards[1]) <= 0 ?
                            cardToNumberText(cards[0]) + cardToNumberText(cards[1]) :
                            cardToNumberText(cards[1]) + cardToNumberText(cards[0])
                    );
                } else {
                    // two pair with second and third
                    score = 2 * MULTIPLIER_BASE + parseInt(
                        (
                            cardCompare(cards[1], cards[2]) <= 0 ?
                                cardToNumberText(cards[1]) + cardToNumberText(cards[1]) + cardToNumberText(cards[2]) + cardToNumberText(cards[2]) :
                                cardToNumberText(cards[2]) + cardToNumberText(cards[2]) + cardToNumberText(cards[1]) + cardToNumberText(cards[1])
                        ) +
                        cardToNumberText(cards[0])
                    );
                }
                break;
            case 4:
                if (hand[cards[0]] === 2) {
                    // one pair
                    score = 1 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[0]) +
                        cardToNumberText(cards[0]) +
                        (
                            cardCompare(cards[1], cards[2]) <= 0 ?
                                (
                                    cardCompare(cards[1], cards[3]) <= 0 ?
                                        (cardCompare(cards[2], cards[3]) <= 0 ?
                                            cardToNumberText(cards[1]) + cardToNumberText(cards[2]) + cardToNumberText(cards[3]) :
                                            cardToNumberText(cards[1]) + cardToNumberText(cards[3]) + cardToNumberText(cards[2])) :
                                        cardToNumberText(cards[3]) + cardToNumberText(cards[1]) + cardToNumberText(cards[2])
                                ) :
                                (
                                    cardCompare(cards[1], cards[3]) <= 0 ?
                                        cardToNumberText(cards[2]) + cardToNumberText(cards[1]) + cardToNumberText(cards[3]) :
                                        (cardCompare(cards[2], cards[3]) <= 0 ?
                                            cardToNumberText(cards[2]) + cardToNumberText(cards[3]) + cardToNumberText(cards[1]) :
                                            cardToNumberText(cards[3]) + cardToNumberText(cards[2]) + cardToNumberText(cards[1]))
                                )
                        )
                    );
                } else if (hand[cards[1]] === 2) {
                    // one pair
                    score = 1 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[1]) +
                        cardToNumberText(cards[1]) +
                        (
                            cardCompare(cards[0], cards[2]) <= 0 ?
                                (
                                    cardCompare(cards[0], cards[3]) <= 0 ?
                                        (cardCompare(cards[2], cards[3]) <= 0 ?
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[2]) + cardToNumberText(cards[3]) :
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[3]) + cardToNumberText(cards[2])) :
                                        cardToNumberText(cards[3]) + cardToNumberText(cards[0]) + cardToNumberText(cards[2])
                                ) :
                                (
                                    cardCompare(cards[0], cards[3]) <= 0 ?
                                        cardToNumberText(cards[2]) + cardToNumberText(cards[0]) + cardToNumberText(cards[3]) :
                                        (cardCompare(cards[2], cards[3]) <= 0 ?
                                            cardToNumberText(cards[2]) + cardToNumberText(cards[3]) + cardToNumberText(cards[0]) :
                                            cardToNumberText(cards[3]) + cardToNumberText(cards[2]) + cardToNumberText(cards[0]))
                                )
                        )
                    );
                } else if (hand[cards[2]] === 2) {
                    // one pair
                    score = 1 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[2]) +
                        cardToNumberText(cards[2]) +
                        (
                            cardCompare(cards[0], cards[1]) <= 0 ?
                                (
                                    cardCompare(cards[0], cards[3]) <= 0 ?
                                        (cardCompare(cards[1], cards[3]) <= 0 ?
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[1]) + cardToNumberText(cards[3]) :
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[3]) + cardToNumberText(cards[1])) :
                                        cardToNumberText(cards[3]) + cardToNumberText(cards[0]) + cardToNumberText(cards[1])
                                ) :
                                (
                                    cardCompare(cards[0], cards[3]) <= 0 ?
                                        cardToNumberText(cards[1]) + cardToNumberText(cards[0]) + cardToNumberText(cards[3]) :
                                        (cardCompare(cards[1], cards[3]) <= 0 ?
                                            cardToNumberText(cards[1]) + cardToNumberText(cards[3]) + cardToNumberText(cards[0]) :
                                            cardToNumberText(cards[3]) + cardToNumberText(cards[1]) + cardToNumberText(cards[0]))
                                )
                        )
                    );
                } else {
                    // one pair
                    score = 1 * MULTIPLIER_BASE + parseInt(
                        cardToNumberText(cards[3]) +
                        cardToNumberText(cards[3]) +
                        (
                            cardCompare(cards[0], cards[1]) <= 0 ?
                                (
                                    cardCompare(cards[0], cards[2]) <= 0 ?
                                        (cardCompare(cards[1], cards[2]) <= 0 ?
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[1]) + cardToNumberText(cards[2]) :
                                            cardToNumberText(cards[0]) + cardToNumberText(cards[2]) + cardToNumberText(cards[1])) :
                                        cardToNumberText(cards[2]) + cardToNumberText(cards[0]) + cardToNumberText(cards[1])
                                ) :
                                (
                                    cardCompare(cards[0], cards[2]) <= 0 ?
                                        cardToNumberText(cards[1]) + cardToNumberText(cards[0]) + cardToNumberText(cards[2]) :
                                        (cardCompare(cards[1], cards[2]) <= 0 ?
                                            cardToNumberText(cards[1]) + cardToNumberText(cards[2]) + cardToNumberText(cards[0]) :
                                            cardToNumberText(cards[2]) + cardToNumberText(cards[1]) + cardToNumberText(cards[0]))
                                )
                        )
                    );
                }
                break;
            case 5:
                // high card
                score = parseInt(
                    sortHand(cards.join('')).split('').map(card => cardToNumberText(card)).join('')
                );
                break;
        }

        return {
            ... hand,
            score: score
        }
    });
    
    let values = handMap.sort((a, b) => a.score - b.score).map((hand, index) => {
        return (index + 1) * hand.bet;
    });

    return values.reduce((a, b) => a + b, 0);
    // 252613534 is too high
}

export default run;