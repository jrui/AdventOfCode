import { readFileSync } from 'fs';


function allValuesZero(values) {
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== 0) {
            return false;
        }
    }
    return true;
}


function run() {
    const lines = readFileSync('./day09/input/input1.txt', 'utf-8').split('\n');

    let sum = 0;
    lines.forEach(line => {
        let values = line.split(' ');
        let layers = [values];

        let level = 0;
        while (!allValuesZero(layers[level])) {
            let layer = [];
            for (let i = 0; i < layers[level].length - 1; i++) {
                layer.push((parseInt(layers[level][i + 1]) - parseInt(layers[level][i])));
            }
            layers.push(layer);
            level++;
        }

        let nextValue = 0;
        for (let i = layers.length - 2; i >= 0; i--) {
            nextValue += parseInt(layers[i][layers[i].length - 1]);
        }

        sum += nextValue;
    });

    return sum;
}

export default run;
  
