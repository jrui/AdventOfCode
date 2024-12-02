import { readFileSync } from 'fs';


function arrayContainsGalaxy(line) {
    return [... new Set(line.split(''))].indexOf('#') !== -1;
}


function transposeMatrix(matrix) {
    return matrix.reduce((prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])), []);
}

let yCompressed = [];
let xCompressed = [];

function uncompressLines(lines) {
    let parsedRows = [];
    lines.map((line, index) => {
        if (!arrayContainsGalaxy(line)) {
            let tempLine = [];
            yCompressed.push(index);
            for (let i = 0; i < line.length; i++) {
                tempLine.push('x');
            }
            parsedRows.push(tempLine.join(''));
        }
        else parsedRows.push(line);
    });

    let spaceMatrix = parsedRows.map(row => row.split(''));
    let tMatrix = transposeMatrix(spaceMatrix);

    let parsedCols = [];
    tMatrix.map((line, index) => {
        if (!arrayContainsGalaxy(line.join(''))) {
            let tempLine = [];
            xCompressed.push(index);
            for (let i = 0; i < line.length; i++) {
                if (tMatrix[index - 1][i] === 'x') tempLine.push('X');
                else tempLine.push('x')
            }
            parsedCols.push(tempLine.join(''));
        }
        else parsedCols.push(line.join(''));
    });

    return transposeMatrix(parsedCols.map(row => row.split('')));
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
    // console.log(`Uncompressed lines: \n${uncompressedLines.map(line => line.join('')).join('\n')}`);
    // console.log('xCompressed: ', xCompressed);
    // console.log('yCompressed: ', yCompressed);

    const galaxyPositions = extractGalaxyPositions(uncompressedLines);
    const galaxyDistanceMap = {};
    // console.log('Found galaxy positions: ', galaxyPositions.length);

    galaxyPositions.map((position1, index1) => {
        const [x1, y1] = position1;
        galaxyPositions.map((position2, index2) => {
            const [x2, y2] = position2;

            if (index1 !== index2) {
                if (!galaxyDistanceMap[`${x1} ${y1} - ${x2} ${y2}`]) {
                    if (!galaxyDistanceMap[`${x2} ${y2} - ${x1} ${y1}`]) {
                        const sortedX = [x1, x2].sort((a, b) => a - b);
                        const nCompressedX = xCompressed.filter(x => x > sortedX[0] && x < sortedX[1]).length;

                        const sortedY = [y1, y2].sort((a, b) => a - b);
                        const nCompressedY = yCompressed.filter(y => y > sortedY[0] && y < sortedY[1]).length;
                        
                        galaxyDistanceMap[`${x1} ${y1} - ${x2} ${y2}`] = 
                            (Math.abs(x1 - x2) + Math.abs(y1 - y2)) + 
                            (nCompressedX * 1000000 + nCompressedY * 1000000) -
                            (nCompressedX + nCompressedY);
                    }
                }
            }
        });
    });

    // console.log('Galaxy positions: ', galaxyDistanceMap);
    return Object.values(galaxyDistanceMap).reduce((a, b) => a + b, 0);
}

export default run;