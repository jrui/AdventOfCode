import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day03/input/input2.txt', 'utf-8').split('\n');
    const width = lines[0].length;
    const height = lines.length;

    let sum = 0;
    let gearPositions = {};

    for (let y = 0; y < height; y++) {
        let currNumber = '';
        let hasGearNearby = false;

        let currStarCoords = '';

        for (let x = 0; x < width; x++) {
            if (lines[y][x].match(/\d/g) !== null) {
                currNumber += lines[y][x];

                // left
                if (x > 0 && lines[y][x - 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x - 1} ${y}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }
                // right
                if (x < width - 1 && lines[y][x + 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x + 1} ${y}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }
                // top
                if (y > 0 && lines[y - 1][x].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x} ${y - 1}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }
                // bottom
                if (y < height - 1 && lines[y + 1][x].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x} ${y + 1}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }

                // top left
                if (y > 0 && x > 0 && lines[y - 1][x - 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x - 1} ${y - 1}`;
                    gearPositions[currStarCoords] = gearPositions[currStarCoords] || [];
                }
                // top right
                if (y > 0 && x < width - 1 && lines[y - 1][x + 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x + 1} ${y - 1}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }
                // bottom left
                if (y < height - 1 && x > 0 && lines[y + 1][x - 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x - 1} ${y + 1}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }
                // bottom right
                if (y < height - 1 && x < width - 1 && lines[y + 1][x + 1].match(/\*/g) !== null) {
                    hasGearNearby = true;
                    currStarCoords = `${x + 1} ${y + 1}`;
                    gearPositions[currStarCoords] = [... gearPositions[currStarCoords] || []];
                }

            }
            else {
                if (hasGearNearby) {
                    gearPositions[currStarCoords].push(currNumber);
                };

                currNumber = '';
                hasGearNearby = false;
            }
        }

        // adding edge case when the line ends with a number
        if (hasGearNearby) gearPositions[currStarCoords].push(currNumber);

        currNumber = '';
        hasGearNearby = false;
    }

    Object
        .entries(gearPositions)
        .forEach(([_, value]) =>
            value.length === 2
            ? sum += parseInt(value[0]) * parseInt(value[1])
            : null
        );

    // 75 805 607
    return sum;
}

export default run;
