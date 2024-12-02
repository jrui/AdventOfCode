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
exports.solution = void 0;
const fs = __importStar(require("fs"));
const mathjs_1 = require("mathjs");
const commons_1 = require("../utils/commons");
const math = (0, mathjs_1.create)(mathjs_1.all, {});
const POS_DELTAS = [
    math.complex(0, -1),
    math.complex(0, 1),
    math.complex(-1, 0),
    math.complex(1, 0),
];
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .trimEnd()
        .split("\n")
        .map((l) => l.split("").map((c) => Number.parseInt(c, 10)));
}
function visibleToEdge(forest, pos_tree, step) {
    let pos = math.add(pos_tree.clone(), step);
    while (pos.re.inRange(0, forest.length - 1) &&
        pos.im.inRange(0, forest[0].length - 1)) {
        if (forest[pos.re][pos.im] < forest[pos_tree.re][pos_tree.im]) {
            pos = math.add(pos, step);
        }
        else {
            return false;
        }
    }
    return true;
}
function visibleAt(forest, pos) {
    return POS_DELTAS.some((step) => visibleToEdge(forest, pos, step));
}
function solution() {
    let forest = parseFile('inputFiles/task1.txt');
    let visible = 2 * (forest.length + forest[0].length) - 4;
    (0, commons_1.range)(1, forest.length - 1).forEach((row) => {
        (0, commons_1.range)(1, forest[0].length - 1).forEach((col) => {
            const pos = math.complex(row, col);
            if (visibleAt(forest, pos))
                visible++;
        });
    });
    return visible;
}
exports.solution = solution;
console.log(solution());
