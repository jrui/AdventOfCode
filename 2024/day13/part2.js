import { readFileSync } from 'fs';


function run() {
    let lines = readFileSync('./day13/input/input2.txt', 'utf-8').split('\n\n')
        .map(instructions => instructions.split('\n'))
        .map(group => {
            return group
                .map(info => info.split(': ')[1])
                .map(info => [
                    Number(info.split(', ')[0].slice(2)), 
                    Number(info.split(', ')[1].slice(2))
                ]);
        });
    
    const [A_COST, B_COST] = [3, 1];
    /**
     * To solve this problem we have the math formula of:
     * | x * a1 + y * b1 = c1
     * | x * a2 + y * b2 = c2
     * 
     * where a1 is ax, b1 is bx, c1 is px
     * and a2 is ay, b2 is by, c2 is py
     * x and y are the solution of the system of equations
     *
     * Solving a somewhat long equation system we get to:
     * | x = (c1 - y * b1) / a1
     * | y = (c2 * a1 - c1 * a2) / (b2 * a1 - b1 * a2)
     */
    let totalCost = lines.map(([[ax, ay], [bx, by], [px, py]]) => {
        let P_SHIFT = 10000000000000;
        px += P_SHIFT;
        py += P_SHIFT;

        let y = (py * ax - px * ay) / (by * ax - bx * ay);
        let x = (px - y * bx) / ax;

        let hasSolution = x % 1 === 0 && y % 1 === 0;
        if (hasSolution) {
            return x * A_COST + y * B_COST;
        }
        return 0
    });

    return totalCost.reduce((acc, curr) => acc + curr, 0);
}

export default run;
  
