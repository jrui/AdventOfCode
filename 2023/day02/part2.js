import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day02/input/input2.txt', 'utf-8').split('\n')
    let powerSum = 0;

    lines.forEach(line => {
        const [gameId, gamesString] = line.split(':');
        const id = gameId.replaceAll(/Game /g, '');
        let games = gamesString.split(';');

        let minRed = 0;
        let minGreen = 0;
        let minBlue = 0;

        games.forEach(game => {
            const colors = game.split(',');
            colors.forEach(colorMap => {
                const [_, number, color] = colorMap.split(' ');
                switch (color) {
                    case 'red':
                        minRed = Math.max(minRed, parseInt(number));
                        break;
                    case 'green':
                        minGreen = Math.max(minGreen, parseInt(number));
                        break;
                    case 'blue':
                        minBlue = Math.max(minBlue, parseInt(number));
                        break;
                }
            });
        });

        // console.log(line);
        // console.log(`Game ${id} min values are: ${minRed}, ${minGreen}, ${minBlue}`);
        // console.log(`Power sum is: ${minRed * minGreen * minBlue}\n`);
        powerSum += minRed * minGreen * minBlue;
    });

    return powerSum;
}

export default run;