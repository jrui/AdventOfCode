"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
const fs_1 = __importDefault(require("fs"));
function answer() {
    const movements = fs_1.default.readFileSync('./inputFiles/task1.txt', 'utf8')
        .toString()
        .trimEnd().split('\n').filter(Boolean).map((line) => {
        const [d, s] = line.split(' ');
        if (d !== 'D' && d !== 'L' && d !== 'U' && d !== 'R') {
            throw new Error(`Wrong direction: "${d}"`);
        }
        return {
            direction: d,
            steps: Number(s)
        };
    });
    const visitedTailPositions = new Set([JSON.stringify({ x: 0, y: 0 })]);
    let headPosition = { x: 0, y: 0 };
    let tailPosition = { x: 0, y: 0 };
    movements.forEach(m => {
        for (let i = 0; i < m.steps; i++) {
            headPosition = move(headPosition, m.direction);
            tailPosition = moveTailToHead(tailPosition, headPosition);
            visitedTailPositions.add(JSON.stringify(tailPosition));
        }
    });
    // console.log(visitedTailPositions);
    return String(visitedTailPositions.size);
}
exports.answer = answer;
// ------------------- helper functions -----------------
function move(p, d) {
    switch (d) {
        case 'D': return { x: p.x, y: p.y - 1 };
        case 'U': return { x: p.x, y: p.y + 1 };
        case 'L': return { x: p.x - 1, y: p.y };
        case 'R': return { x: p.x + 1, y: p.y };
    }
}
function moveTailToHead(tp, hp) {
    // All positions
    // .xdx.
    // x---x
    // d-t-d
    // x---x
    // .xdx.
    const diff = posDiff(tp, hp);
    // console.log('diff', diff);
    // handle "-" and "t" positions
    if (diff.x >= -1 &&
        diff.x <= 1 &&
        diff.y >= -1 &&
        diff.y <= 1) {
        return { x: tp.x, y: tp.y };
    }
    // handle "d" and "x" positions
    // top
    else if (diff.y === +2 && diff.x === -1)
        return { x: tp.x - 1, y: tp.y + 1 };
    else if (diff.y === +2 && diff.x === 0)
        return { x: tp.x, y: tp.y + 1 };
    else if (diff.y === +2 && diff.x === +1)
        return { x: tp.x + 1, y: tp.y + 1 };
    // bottom
    else if (diff.y === -2 && diff.x === -1)
        return { x: tp.x - 1, y: tp.y - 1 };
    else if (diff.y === -2 && diff.x === 0)
        return { x: tp.x, y: tp.y - 1 };
    else if (diff.y === -2 && diff.x === +1)
        return { x: tp.x + 1, y: tp.y - 1 };
    // right
    else if (diff.x === +2 && diff.y === -1)
        return { x: tp.x + 1, y: tp.y - 1 };
    else if (diff.x === +2 && diff.y === 0)
        return { x: tp.x + 1, y: tp.y };
    else if (diff.x === +2 && diff.y === +1)
        return { x: tp.x + 1, y: tp.y + 1 };
    // left
    else if (diff.x === -2 && diff.y === -1)
        return { x: tp.x - 1, y: tp.y - 1 };
    else if (diff.x === -2 && diff.y === 0)
        return { x: tp.x - 1, y: tp.y };
    else if (diff.x === -2 && diff.y === +1)
        return { x: tp.x - 1, y: tp.y + 1 };
    throw new Error(`Moved too much: diff(x: ${diff.x},y: ${diff.y})`);
}
function posDiff(pStart, pEnd) {
    return { x: pEnd.x - pStart.x, y: pEnd.y - pStart.y, };
}
console.log(answer());
