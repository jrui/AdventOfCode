import { readFileSync } from 'fs';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;


function run() {
    const lines = readFileSync('./day02/input/input1.txt', 'utf-8').split('\n')
    let idSum = 0;

    lines.forEach(line => {
        const [gameId, gamesString] = line.split(':');
        const id = gameId.replaceAll(/Game /g, '');
        let games = gamesString.split(';');
        let allGamesValid = true;

        games.forEach(game => {
            const colors = game.split(',');
            colors.forEach(colorMap => {
                const [_, number, color] = colorMap.split(' ');
                switch (color) {
                    case 'red':
                        if (parseInt(number) > MAX_RED) allGamesValid = false;
                        break;
                    case 'green':
                        if (parseInt(number) > MAX_GREEN) allGamesValid = false;
                        break;
                    case 'blue':
                        if (parseInt(number) > MAX_BLUE) allGamesValid = false;
                        break;
                }
            })

        });

        // console.log(line);
        // console.log(`Game ${id} is ${allGamesValid ? 'valid' : 'invalid'}\n`);
        if (allGamesValid) idSum += parseInt(id);
    });

    return idSum;
}

export default run;
  
