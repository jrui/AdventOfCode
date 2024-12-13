import { readFileSync } from 'fs';
import { Cell } from './Cell.js';


function run() {
    let cells = readFileSync('./day12/input/input1.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''))
        .map((row, y) => row.map((symbol, x) => new Cell(x, y, symbol)))
        .flat();

    cells.forEach(cell => cell.setAdjacent(cells));
    let groups = cells.map(cell => cell.getGroup())
        .filter(cell => cell.length > 0)

    return groups.map((group, index) => {
            let totalPerimeter = groups[index]
                .map(cell => cell.perimeter)
                .reduce((a, b) => a + b, 0);

            return group.length * totalPerimeter;
        })
        .reduce((a, b) => a + b, 0);
}


export default run;