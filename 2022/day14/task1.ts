import * as fs from 'fs';
import * as _ from 'lodash';


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


function writeToFile(filename: string, board: string[][]): void {
    board.forEach((row: string[]) => {
        fs.writeFileSync(filename, row.join('') + '\n', { flag: 'a' });
    });
    fs.writeFileSync(filename, '\n\n', { flag: 'a' });
}


function initializeBoard(lines: string[]): Record<string, any> {
    let minX: number = Infinity;
    let maxX: number = -Infinity;
    let minY: number = Infinity;
    let maxY: number = -Infinity;
    lines.map((line: string) => {
        let rockCoordsStrArray: string[] = line.split(' -> ');
        rockCoordsStrArray.map((rockCoordsStr: string) => {
            let [xRockCoord, yRockCoord] = rockCoordsStr.split(',').map((coord: string) => parseInt(coord));

            if(xRockCoord < minX) minX = xRockCoord;
            if(xRockCoord > maxX) maxX = xRockCoord;
            if(yRockCoord < minY) minY = yRockCoord;
            if(yRockCoord > maxY) maxY = yRockCoord;
        });
    });

    let matrix: string[][] = [];
    for (let i = minY - 2; i < maxY + 2; i++) {
        matrix[i] = [];
        for (let j = minX - 2; j < maxX + 2; j++) {
            matrix[i][j] = '.';
        }
    }

    lines.map((line: string) => {
        let rockCoordsStrArray: string[] = line.split(' -> ');
        let consecutiveCoords: number[][] = rockCoordsStrArray.map((rockCoordsStr: string) => {
            let [xRockCoord, yRockCoord] = rockCoordsStr.split(',').map((coord: string) => parseInt(coord));

            return [xRockCoord, yRockCoord];
        });

        for (let i = 0; i < consecutiveCoords.length - 1; i++) {
            let [x1, y1] = consecutiveCoords[i];
            let [x2, y2] = consecutiveCoords[i + 1];
            let [xMin, xMax] = [Math.min(x1, x2), Math.max(x1, x2)];
            let [yMin, yMax] = [Math.min(y1, y2), Math.max(y1, y2)];
            for (let j = yMin; j <= yMax; j++) {
                for (let k = xMin; k <= xMax; k++) {
                    matrix[j][k] = '#';
                }
            }
        }
    });
    let lastline: string[] = matrix[maxY + 1];
    matrix.unshift(lastline);
    matrix.unshift(lastline);
    matrix.unshift(lastline);
    matrix.unshift(lastline);
    matrix.unshift(lastline);

    return {
        board: matrix,
        boundaries: {
            minX,
            maxX,
            minY,
            maxY
        }
    };
}


function checkWithinBoundaries(x: number, y: number, boundaries: Record<string, any>): boolean {
    return (x > boundaries.minX && x < boundaries.maxX && y > boundaries.minY && y < boundaries.maxY);
}


function computeSandDrop(board: string[][], boundaries: Record<string, any>, dropPosition: number[]): Record<string, any> {
    if (board[dropPosition[0]][dropPosition[1]] === '.') {
        if (board[dropPosition[0] + 1][dropPosition[1]] === '.') {
            return computeSandDrop(board, boundaries, [dropPosition[0] + 1, dropPosition[1]]);
        }
        if (board[dropPosition[0] + 1][dropPosition[1] - 1] === '.') {
            return computeSandDrop(board, boundaries, [dropPosition[0] + 1, dropPosition[1] - 1]);
        }
        if (board[dropPosition[0] + 1][dropPosition[1] + 1] === '.') {
            return computeSandDrop(board, boundaries, [dropPosition[0] + 1, dropPosition[1] + 1]);
        }

        board[dropPosition[0]][dropPosition[1]] = 'o';
        return board;
    }

    return board;
}


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');
    let { board, boundaries }: Record<string, any> = initializeBoard(lines);

    // board = computeSandDrop(board, boundaries, [0, 500]);

    writeToFile('outputFiles/task1.txt', board);
    return board;
}


console.log(solution());
export { solution, parseFile };
