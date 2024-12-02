import * as fs from 'fs';
import { create, all, MathJsStatic, Complex } from 'mathjs';
import { range } from '../utils/commons';

const math: MathJsStatic = create(all, {});
const POS_DELTAS : Array<Complex> = [
    math.complex(0, -1),
    math.complex(0, 1),
    math.complex(-1, 0),
    math.complex(1, 0),
];


function parseFile(filename: string): number[][] {
    console.log('Reading file: ' + filename);
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .trimEnd()
        .split("\n")
        .map((l) => l.split("").map((c) => Number.parseInt(c, 10)));
}


function visibleToEdge(forest: any, pos_tree: any, step: Complex) {
    let pos = math.add(pos_tree.clone(), step);
    while (
        pos.re.inRange(0, forest.length - 1) &&
        pos.im.inRange(0, forest[0].length - 1)
        ) {
        if (forest[pos.re][pos.im] < forest[pos_tree.re][pos_tree.im]) {
            pos = math.add(pos, step);
        } else {
            return false;
        }
    }
    return true;
}


function visibleAt(forest: number[][], pos: Complex) {
    return POS_DELTAS.some((step) => visibleToEdge(forest, pos, step));
}


function solution(): any {
    let forest: number[][] = parseFile('inputFiles/task1.txt');
    let visible = 2 * (forest.length + forest[0].length) - 4;

    range(1, forest.length - 1).forEach((row) => {
        range(1, forest[0].length - 1).forEach((col) => {
            const pos = math.complex(row, col);
            if (visibleAt(forest, pos)) visible++;
        });
    });

    return visible;
}



console.log(solution());
export { solution };

