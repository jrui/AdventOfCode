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
    let sprite = "###.....................................".split("");
    let current = "";
    let cycle = 0;
    let X = 0;
    lines.forEach((line) => {
        const cmd = line.split(" ");
        // console.log(cmd);
        if (cmd.length === 1) {
            // noop cycle
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            }
            else {
                current += ".";
            }
        }
        else if (cmd.length === 2) {
            // add Y cycle 1
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            }
            else {
                current += ".";
            }
            // console.log(cycle, current);
            // console.log(sprite.join(""));
            // console.log("\n");
            // add Y cycle 2
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            }
            else {
                current += ".";
            }
            // end of cycle 2
            sprite[X + 0] = ".";
            sprite[X + 1] = ".";
            sprite[X + 2] = ".";
            X += parseInt(cmd[1]);
            sprite[X + 0] = "#";
            sprite[X + 1] = "#";
            sprite[X + 2] = "#";
            // console.log(cycle, current);
            // console.log(sprite.join(""));
        }
    });
    console.log("PART 2 :");
    let line = "";
    for (let i = 0; i < 240; i++) {
        if (i % 40 === 0) {
            console.log(line);
            line = "";
        }
        line += current[i];
    }
    return line;
}
exports.solution = solution;
console.log(solution());
