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
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    let cycle = 0;
    let X = 1;
    let sum = 0;
    lines.forEach((line) => {
        const cmd = line.split(" ");
        // console.log(cmd);
        const catchCycles = [20, 60, 100, 140, 180, 220];
        if (cmd.length === 1) {
            // noop cycle
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
        }
        else if (cmd.length === 2) {
            // add Y cycle 1
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
            // add Y cycle 2
            cycle++;
            if (catchCycles.includes(cycle)) {
                // console.log(cycle, X, cycle * X);
                sum += cycle * X;
            }
            // end of cycle 2
            X += parseInt(cmd[1]);
        }
    });
    return sum;
}
exports.solution = solution;
console.log(solution());
