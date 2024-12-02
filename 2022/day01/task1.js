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
/*
 Read File and parse lines containing a number
 group them by blocks, each block is separated by a blank line
 */
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    const lines = file.split('\n');
    const blocks = [];
    let block = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            blocks.push(block);
            block = [];
        }
        else {
            block.push(parseInt(lines[i]));
        }
    }
    return blocks;
}
function solution() {
    const blocks = parseFile('inputFile/task1.txt');
    console.log('Blocks: ', blocks);
    const sums = blocks.map(block => block.reduce((a, acc) => a + acc, 0));
    console.log('Sums: ', sums);
    return {
        sums,
        maximum: Math.max(...sums)
    };
}
exports.solution = solution;
console.log(solution().maximum);
