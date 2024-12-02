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
const range = (low, high) => Array.from({ length: high - low + 1 }, (_, i) => low + i);
const some = (r1, r2) => r1.some((r) => r2.includes(r)) || r2.some((r) => r1.includes(r));
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines = file.split('\n'); // add newline
    return lines;
}
const createSections = (input) => {
    return input.reduce((acc, line) => {
        const sections = line.split(",").reduce((sections, section) => {
            section.split("-").forEach((area) => sections.push(Number(area)));
            return sections;
        }, []);
        acc.push(sections);
        return acc;
    }, []);
};
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    return createSections(lines).reduce((overlap, area) => {
        const [elf1, elf2] = [range(area[0], area[1]), range(area[2], area[3])];
        if (some(elf1, elf2))
            overlap += 1;
        return overlap;
    }, 0);
}
exports.solution = solution;
console.log(solution());
