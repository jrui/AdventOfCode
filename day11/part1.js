import { readFileSync } from 'fs';


function entireArrayIsSameCharacter(line) {
    return [... new Set(line.split(''))].length === 1;
}



function uncompressLines(lines) {
    let uncompressedRows = [];
    lines.map((line, index) => {
        if (entireArrayIsSameCharacter(line)) {
            // console.log('entire row is same character', index);
            uncompressedRows.push(line);
        }
        uncompressedRows.push(line);
    });

    let lineMatrix = uncompressedRows.map(row => row.split(''));
    for (let i = lineMatrix[0].length - 1; i > 0; i--) {
        lines = lineMatrix.map(line => line[i]);
        if (entireArrayIsSameCharacter(lines.join(''))) {
            // console.log('entire column is same character', i)
            lineMatrix = lineMatrix.map(line => [line.slice(0, i), line[i], line.slice(i)].flat());
        }
    }


    return lineMatrix;
}


function extractGalaxyPositions(lines) {
    const galaxyPositions = [];
    lines.map((line, lineIndex) => {
        line.map((character, characterIndex) => {
            if (character === '#') {
                galaxyPositions.push([characterIndex, lineIndex]);
            }
        });
    });

    return galaxyPositions;
}


function run() {
    const lines = readFileSync('./day11/input/input1.txt', 'utf-8').split('\n');
    // console.log('Initial dimensions: ', lines[0].length, lines.length);
    const uncompressedLines = uncompressLines(lines);
    // console.log('Uncompressed dimensions: ', uncompressedLines[0].length, uncompressedLines.length);

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
  
