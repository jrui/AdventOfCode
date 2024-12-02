import {create, all, Complex, MathType} from 'mathjs';
import { range } from '../utils/commons';
import fs from 'fs';

const math = create(all, {});

const POS_DELTAS = [
    math.complex(0, -1),
    math.complex(0, 1),
    math.complex(-1, 0),
    math.complex(1, 0),
];


function scenicScoreToEdge(forest: string | any[], pos_tree: MathType, step: Complex): number {
    let pos = math.add(pos_tree.clone(), step);
    let visible: number = 0;
    while (
        pos.re.inRange(0, forest.length - 1) &&
        pos.im.inRange(0, forest[0].length - 1)
        ) {
        visible++;
        // @ts-ignore
        if (forest[pos.re][pos.im] >= forest[pos_tree.re][pos_tree.im]) {
            break;
        } else {
            pos = math.add(pos, step);
        }
    }
    return visible;
}


function scenicScore (forest: string | any[], pos: Complex) {
    // @ts-ignore
    return POS_DELTAS.map((delta) => scenicScoreToEdge(forest, pos, delta)).mul();
}

function parseFile(filename: string): number[][] {
    console.log('Reading file: ' + filename);
    return fs.readFileSync(filename, 'utf8')
        .toString()
        .trimEnd()
        .split("\n")
        .map((l) => l.split("").map((c) => Number.parseInt(c, 10)));
}


function solution(): any {
    let forest: number[][] = parseFile('inputFiles/task1.txt');
    let scores: any[] = [];

    range(0, forest.length).forEach((row: number) => {
        range(0, forest[0].length).forEach((col: number) => {
            const pos: Complex = math.complex(row, col);
            scores.push(scenicScore(forest, pos));
        });
    });

    // @ts-ignore
    return scores.max();
}


console.log(solution());
export { solution };

