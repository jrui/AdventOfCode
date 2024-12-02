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
var AdversaryPlay;
(function (AdversaryPlay) {
    AdversaryPlay["ROCK"] = "A";
    AdversaryPlay["PAPER"] = "B";
    AdversaryPlay["SCISSORS"] = "C";
})(AdversaryPlay || (AdversaryPlay = {}));
var MyPlay;
(function (MyPlay) {
    MyPlay["ROCK"] = "X";
    MyPlay["PAPER"] = "Y";
    MyPlay["SCISSORS"] = "Z";
})(MyPlay || (MyPlay = {}));
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    return file.split('\n');
}
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    let totalScore = 0;
    for (let i = 0; i < lines.length; i++) {
        const [advPlay, myPlay] = lines[i].split(' ');
        switch (advPlay) {
            case AdversaryPlay.ROCK:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 3;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 6;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 0;
                }
                break;
            case AdversaryPlay.PAPER:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 0;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 3;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 6;
                }
                break;
            case AdversaryPlay.SCISSORS:
                if (myPlay === MyPlay.ROCK) {
                    totalScore += 1 + 6;
                }
                if (myPlay === MyPlay.PAPER) {
                    totalScore += 2 + 0;
                }
                if (myPlay === MyPlay.SCISSORS) {
                    totalScore += 3 + 3;
                }
                break;
            default:
                break;
        }
    }
    // Write your code
    return totalScore;
}
exports.solution = solution;
