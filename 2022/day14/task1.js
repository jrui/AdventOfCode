"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = exports.solution = void 0;
const fs = __importStar(require("fs"));
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines = file.split('\n'); // add newline
    return lines;
}
exports.parseFile = parseFile;
function writeToFile(filename, board) {
    board.forEach((row) => {
        fs.writeFileSync(filename, row.join('') + '\n', { flag: 'a' });
    });
    fs.writeFileSync(filename, '\n\n', { flag: 'a' });
}
function initializeBoard(lines) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    lines.map((line) => {
        let rockCoordsStrArray = line.split(' -> ');
        rockCoordsStrArray.map((rockCoordsStr) => {
            let [xRockCoord, yRockCoord] = rockCoordsStr.split(',').map((coord) => parseInt(coord));
            if (xRockCoord < minX)
                minX = xRockCoord;
            if (xRockCoord > maxX)
                maxX = xRockCoord;
            if (yRockCoord < minY)
                minY = yRockCoord;
            if (yRockCoord > maxY)
                maxY = yRockCoord;
        });
    });
    let matrix = [];
    for (let i = minY - 2; i < maxY + 2; i++) {
        matrix[i] = [];
        for (let j = minX - 2; j < maxX + 2; j++) {
            matrix[i][j] = '.';
        }
    }
    lines.map((line) => {
        let rockCoordsStrArray = line.split(' -> ');
        let consecutiveCoords = rockCoordsStrArray.map((rockCoordsStr) => {
            let [xRockCoord, yRockCoord] = rockCoordsStr.split(',').map((coord) => parseInt(coord));
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
    let lastline = matrix[maxY + 1];
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
function checkWithinBoundaries(x, y, boundaries) {
    return (x > boundaries.minX && x < boundaries.maxX && y > boundaries.minY && y < boundaries.maxY);
}
function computeSandDrop(board, boundaries, dropPosition) {
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
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    let { board, boundaries } = initializeBoard(lines);
    // board = computeSandDrop(board, boundaries, [0, 500]);
    writeToFile('outputFiles/task1.txt', board);
    return board;
}
exports.solution = solution;
console.log(solution());
