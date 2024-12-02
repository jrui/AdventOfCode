import * as fs from 'fs';
import { get, find, memoize } from 'lodash';


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


interface Dir {
    path: string;
    files: string[];
    size: number;
}


let dirList: Array<Dir> = [];
// @ts-ignore
// @ts-ignore
// @ts-ignore
const calculateDirSize = memoize((dir: string): number => {
    /*return dirList.find((dirctory: Dir) => dirctory.path === dir) ?
        dirList.find((dirctory: Dir) => dirctory.path === dir).size :
        0;
*/
    let currentDirObject: Dir = dirList.find((dirObject: Dir) => dirObject.path === dir) || {path: '', files: [], size: 0};

    currentDirObject = {
        path: get(currentDirObject, 'path'),
        files: get(currentDirObject, 'files'),
        size: get(currentDirObject, 'files')
            .reduce((acc: number, file: string) => {
                let [size, name] = file.split(' ');

                if (size === 'dir') {
                    console.log('=======> dir', name);
                    return acc + calculateDirSize(name);
                }
                return acc + parseInt(size);
            },
            0)
    }
    console.log('calculated dir size for: ', currentDirObject);

    return currentDirObject.size;
});


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    let currentDir: string = '';
    let lsed: boolean = false;
    for (let line of lines) {
        if (line.match(/(\$ cd)/g)) {
            lsed = false;
            currentDir = line.split('$ cd ')[1];
        }
        else if (line.match(/(\$ ls)/g)) {
            lsed = true;
        }
        else if(lsed) {
            let [size, name] = line.split(' ');

            if (dirList.find((dir: Dir) => dir.path === currentDir)) {
                if (size === 'dir') {
                    dirList = dirList.map((dir: Dir) => {
                        if (dir.path === currentDir) {
                            return {
                                path: dir.path,
                                files: [...dir.files, `${size} ${name}`],
                                size: dir.size + calculateDirSize(name)
                            }
                        }
                        return dir;
                    });
                }
                else {
                    dirList = dirList.map(dir => {
                        if (get(dir, 'path', '') === currentDir) {
                            return {
                                path: get(dir, 'path'),
                                files: [...get(dir, 'files', []), line],
                                size: isNaN(get(dir, 'size')) ? 0 : get(dir, 'size', 0) + parseInt(size)
                            }
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
    dirList = [... new Set(dirList)].sort();

    calculateDirSize('/');

    console.log(dirList);

    console.log('Solution: ', dirList
        .map((dir: Dir) => calculateDirSize(dir.path))
        .filter(size => size <= 100000)
        .reduce((acc: number, size: number) => acc + size, 0)
    );
    // wrong 1123864

    return 0;
}


console.log(solution());
export { solution };

