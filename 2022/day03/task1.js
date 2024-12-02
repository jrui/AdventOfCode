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
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines = file.split('\n'); // add newline
    return lines;
}
function isLowerCase(char) {
    return char === char.toLowerCase();
}
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    let totalScore = 0;
    for (let k = 0; k < lines.length; k++) {
        let line = lines[k];
        console.log('line: ' + line);
        let firstHalfLetters = {};
        let secondHalfLetters = {};
        for (let i = 0; i < line.length / 2; i++) {
            firstHalfLetters[line.charAt(i)] = (firstHalfLetters[line.charAt(i)] || 0) + 1;
        }
        console.log(firstHalfLetters);
        for (let j = line.length / 2; j < line.length; j++) {
            secondHalfLetters[line.charAt(j)] = (secondHalfLetters[line.charAt(j)] || 0) + 1;
        }
        console.log(secondHalfLetters);
        // find matching key common for both firstHalfLetters and secondHalfLetters
        let matchingKey = '';
        for (const key in firstHalfLetters) {
            if (secondHalfLetters.hasOwnProperty(key)) {
                matchingKey = key;
                break;
            }
        }
        console.log('Matching key: ' + matchingKey);
        const asciiCode = isLowerCase(matchingKey) ?
            matchingKey.charCodeAt(0) - 96 :
            matchingKey.charCodeAt(0) - 38;
        console.log('Ascii code: ' + asciiCode);
        totalScore += asciiCode;
    }
    // Write your code
    return totalScore;
}
exports.solution = solution;
