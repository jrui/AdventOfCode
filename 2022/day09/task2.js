"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
const fs_1 = __importDefault(require("fs"));
function answer(input) {
    const movements = input.split('\n').filter(Boolean).map((line) => {
        const [d, s] = line.split(' ');
        if (d !== 'D' && d !== 'L' && d !== 'U' && d !== 'R') {
            throw new Error(`Wrong direction: "${d}"`);
        }
        return {
            direction: d,
            steps: Number(s)
        };
    });
    const rope = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }, // 9 & Tail
    ];
    const getTail = () => rope[rope.length - 1];
    const visitedTailPositions = new Set([JSON.stringify(getTail())]);
    movements.forEach((m, mi) => {
        // console.log(`\nMovement ${mi}`);
        for (let s = 0; s < m.steps; s++) {
            // console.log(`Step ${s}`);
            rope[0] = move(rope[0], m.direction);
            for (let i = 1; i < rope.length; i++) {
                // console.log(`Moveing ${i}`);
                rope[i] = moveTailToHead(rope[i], rope[i - 1]);
            }
            visitedTailPositions.add(JSON.stringify(getTail()));
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
    // handle "." positions
    else if (diff.x === 2 && diff.y === 2)
        return { x: tp.x + 1, y: tp.y + 1 };
    else if (diff.x === 2 && diff.y === -2)
        return { x: tp.x + 1, y: tp.y - 1 };
    else if (diff.x === -2 && diff.y === -2)
        return { x: tp.x - 1, y: tp.y - 1 };
    else if (diff.x === -2 && diff.y === 2)
        return { x: tp.x - 1, y: tp.y + 1 };
    throw new Error(`Head is too far away: diff(x: ${diff.x},y: ${diff.y})`);
}
function posDiff(pStart, pEnd) {
    return { x: pEnd.x - pStart.x, y: pEnd.y - pStart.y, };
}
console.log(answer(fs_1.default.readFileSync('./inputFiles/task1.txt', 'utf8')
    .toString()
    .trimEnd()));
