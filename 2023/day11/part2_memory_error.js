import { readFileSync } from 'fs';


function entireArrayIsSameCharacter(line) {
    return line.indexOf(true) === -1;
}



function uncompressLines(lines) {
    let uncompressedRowsMatrix = [];
    let expansionFactor = 10000;

    lines.map(line => {
        let parsedLine = line.split('').map(element => element === '#');
        if (entireArrayIsSameCharacter(parsedLine)) {
            for (let i = 0; i <= expansionFactor; i++) {
                uncompressedRowsMatrix.push(parsedLine);
            }
        } else uncompressedRowsMatrix.push(parsedLine);
    });

    for (let i = uncompressedRowsMatrix[0].length - 1; i > 0; i--) {
        let column = uncompressedRowsMatrix.map(row => row[i]);
        // console.log(column)
        if (entireArrayIsSameCharacter(column)) {
            // console.log('entire column is same character', i)
            let tempArray = [];
            for (let i = 0; i <= expansionFactor; i++) {
                tempArray.push(false);
            }
            uncompressedRowsMatrix = uncompressedRowsMatrix.map(row => [row.slice(0, i), ...tempArray, row.slice(i + 1)].flat());
        }
    }

    // console.log(uncompressedRowsMatrix);
    return uncompressedRowsMatrix;
}


function extractGalaxyPositions(lines) {
    const galaxyPositions = [];
    lines.map((line, lineIndex) => {
        line.map((isGalaxy, characterIndex) => {
            if (isGalaxy) galaxyPositions.push([characterIndex, lineIndex]);
        });
    });

    return galaxyPositions;
}


function run() {
    const lines = readFileSync('./day11/input/input1.txt', 'utf-8').split('\n');
    // console.log('Initial dimensions: ', lines[0].length, lines.length);
    const uncompressedLines = uncompressLines(lines);
    console.log('Uncompressed dimensions: ', uncompressedLines[0].length, uncompressedLines.length);

    const galaxyPositions = extractGalaxyPositions(uncompressedLines);
    const galaxyDistanceMap = {};

    galaxyPositions.map((position1, index1) => {
        const [x1, y1] = position1;
        galaxyPositions.map((position2, index2) => {
            const [x2, y2] = position2;

            if (index1 !== index2) {
                if (!galaxyDistanceMap[`${x1} ${y1} - ${x2} ${y2}`]) {
                    if (!galaxyDistanceMap[`${x2} ${y2} - ${x1} ${y1}`]) {
                        galaxyDistanceMap[`${x1} ${y1} - ${x2} ${y2}`] = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                    }
                }
            }
        });
    });

    // console.log('Galaxy positions: ', galaxyDistanceMap);
    return Object.values(galaxyDistanceMap).reduce((a, b) => a + b, 0);
}

export default run;
  
