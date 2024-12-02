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
const lodash_1 = require("lodash");
function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines = file.split('\n'); // add newline
    return lines;
}
let dirList = [];
// @ts-ignore
// @ts-ignore
const calculateDirSize = (0, lodash_1.memoize)((dir) => {
    /*return dirList.find((dirctory: Dir) => dirctory.path === dir) ?
        dirList.find((dirctory: Dir) => dirctory.path === dir).size :
        0;
*/
    let currentDirObject = dirList.find((dirObject) => dirObject.path === dir) || { path: '', files: [], size: 0 };
    currentDirObject = {
        path: (0, lodash_1.get)(currentDirObject, 'path'),
        files: (0, lodash_1.get)(currentDirObject, 'files'),
        size: (0, lodash_1.get)(currentDirObject, 'files')
            .reduce((acc, file) => {
            let [size, name] = file.split(' ');
            if (size === 'dir') {
                console.log('=======> dir', name);
                return acc + calculateDirSize(name);
            }
            return acc + parseInt(size);
        }, 0)
    };
    console.log('calculated dir size for: ', currentDirObject);
    return currentDirObject.size;
}, {
    Cache: new Map()
});
function solution() {
    const lines = parseFile('inputFiles/task1.txt');
    let currentDir = '';
    let lsed = false;
    for (let line of lines) {
        if (line.match(/(\$ cd)/g)) {
            lsed = false;
            currentDir = line.split('$ cd ')[1];
        }
        else if (line.match(/(\$ ls)/g)) {
            lsed = true;
        }
        else if (lsed) {
            let [size, name] = line.split(' ');
            if (dirList.find((dir) => dir.path === currentDir)) {
                if (size === 'dir') {
                    dirList = dirList.map((dir) => {
                        if (dir.path === currentDir) {
                            return {
                                path: dir.path,
                                files: [...dir.files, `${size} ${name}`],
                                size: dir.size + calculateDirSize(name)
                            };
                        }
                        return dir;
                    });
                }
                else {
                    dirList = dirList.map(dir => {
                        if ((0, lodash_1.get)(dir, 'path', '') === currentDir) {
                            return {
                                path: (0, lodash_1.get)(dir, 'path'),
                                files: [...(0, lodash_1.get)(dir, 'files', []), line],
                                size: isNaN((0, lodash_1.get)(dir, 'size')) ? 0 : (0, lodash_1.get)(dir, 'size', 0) + parseInt(size)
                            };
                        }
                        return dir;
                    });
                }
            }
            else {
                let [size, name] = line.split(' ');
                if (size === 'dir') {
                    dirList.push({
                        path: currentDir,
                        files: [line],
                        size: calculateDirSize(name)
                    });
                }
                else {
                    dirList.push({
                        path: currentDir,
                        files: [line],
                        size: parseInt(size)
                    });
                }
            }
        }
    }
    dirList = [...new Set(dirList)].sort();
    calculateDirSize('/');
    console.log(dirList);
    console.log('Solution: ', dirList
        .map((dir) => calculateDirSize(dir.path))
        .filter(size => size <= 100000)
        .reduce((acc, size) => acc + size, 0));
    // wrong 1123864
    return 0;
}
exports.solution = solution;
console.log(solution());
