"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution = void 0;
const mathjs_1 = require("mathjs");
const commons_1 = require("../utils/commons");
const fs_1 = __importDefault(require("fs"));
const math = (0, mathjs_1.create)(mathjs_1.all, {});
const POS_DELTAS = [
    math.complex(0, -1),
    math.complex(0, 1),
    math.complex(-1, 0),
    math.complex(1, 0),
];
function scenicScoreToEdge(forest, pos_tree, step) {
    let pos = math.add(pos_tree.clone(), step);
    let visible = 0;
    while (pos.re.inRange(0, forest.length - 1) &&
        pos.im.inRange(0, forest[0].length - 1)) {
        visible++;
        // @ts-ignore
        if (forest[pos.re][pos.im] >= forest[pos_tree.re][pos_tree.im]) {
            break;
        }
        else {
            pos = math.add(pos, step);
        }
    }
    return visible;
}
function scenicScore(forest, pos) {
    // @ts-ignore
    return POS_DELTAS.map((delta) => scenicScoreToEdge(forest, pos, delta)).mul();
}
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    return fs_1.default.readFileSync(filename, 'utf8')
        .toString()
        .trimEnd()
        .split("\n")
        .map((l) => l.split("").map((c) => Number.parseInt(c, 10)));
}
function solution() {
    let forest = parseFile('inputFiles/task1.txt');
    let scores = [];
    (0, commons_1.range)(0, forest.length).forEach((row) => {
        (0, commons_1.range)(0, forest[0].length).forEach((col) => {
            const pos = math.complex(row, col);
            // @ts-ignore
            scores.push(scenicScore(forest, pos));
        });
    });
    // @ts-ignore
    return scores.max();
}
exports.solution = solution;
console.log(solution());
