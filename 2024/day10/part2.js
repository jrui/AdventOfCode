import { readFileSync } from 'fs';
import { Cell } from './Cell.js';


function run() {
    const cells = readFileSync('./day10/input/input2.txt', 'utf-8')
        .split('\n')
        .map(line => line.split(''))
        .map((line, y) => line.map((value, x) => new Cell(x, y, Number(value))))
        .flat();

    const initialCells = cells.filter(cell => cell.value === 0);

    const nines = {};
    initialCells.forEach(cell => {
        cell.processNeighbors(cells);

        nines[[cell.x, cell.y]]
            ? nines[[cell.x, cell.y]].push(cell.ninePaths)
            : nines[[cell.x, cell.y]] = cell.ninePaths;
    });


    return Object
        .keys(nines)
        .map(key => nines[key].length)
        .reduce((acc, curr) => acc + curr, 0);
}

export default run;
  
