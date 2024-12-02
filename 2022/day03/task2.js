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
    for (let k = 0; k < lines.length; k += 3) {
        let line1 = lines[k];
        let line2 = lines[k + 1];
        let line3 = lines[k + 2];
        let firstLineLetters = {};
        let secondLineLetters = {};
        let thirdLineLetters = {};
        for (let i = 0; i < line1.length; i++) {
            firstLineLetters[line1.charAt(i)] = (firstLineLetters[line1.charAt(i)] || 0) + 1;
        }
        for (let i = 0; i < line2.length; i++) {
            secondLineLetters[line2.charAt(i)] = (secondLineLetters[line2.charAt(i)] || 0) + 1;
        }
        for (let i = 0; i < line3.length; i++) {
            thirdLineLetters[line3.charAt(i)] = (thirdLineLetters[line3.charAt(i)] || 0) + 1;
        }
        // find matching key common for both firstHalfLetters and secondHalfLetters
        let matchingKey = '';
        for (const key in firstLineLetters) {
            if (secondLineLetters.hasOwnProperty(key) && thirdLineLetters.hasOwnProperty(key)) {
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
console.log(solution());
