import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day03/input/input1.txt', 'utf-8').split('\n');
    const width = lines[0].length;
    const height = lines.length;

    let sum = 0;

    for (let y = 0; y < height; y++) {
        let currNumber = '';
        let hasSpecialCaracter = false;
        let added = false;

        for (let x = 0; x < width; x++) {
            if (lines[y][x].match(/\d/g) !== null) {
                currNumber += lines[y][x];

                // left
                if (x > 0 && lines[y][x - 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // right
                if (x < width - 1 && lines[y][x + 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // top
                if (y > 0 && lines[y - 1][x].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // bottom
                if (y < height - 1 && lines[y + 1][x].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;

                // top left
                if (y > 0 && x > 0 && lines[y - 1][x - 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // top right
                if (y > 0 && x < width - 1 && lines[y - 1][x + 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // bottom left
                if (y < height - 1 && x > 0 && lines[y + 1][x - 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;
                // bottom right
                if (y < height - 1 && x < width - 1 && lines[y + 1][x + 1].replaceAll(/\./g, '').replaceAll(/\d/g, '').length === 1) hasSpecialCaracter = true;

            }
            else {
                if (hasSpecialCaracter) sum += parseInt(currNumber);
                currNumber = '';
                hasSpecialCaracter = false;
            }
        }
        // adding edge case when the line ends with a number
        if (hasSpecialCaracter) sum += parseInt(currNumber);

        added = false;
        currNumber = '';
        hasSpecialCaracter = false;
    }

    return sum;
}

export default run;
  
