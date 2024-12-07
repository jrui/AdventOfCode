import { readFileSync } from 'fs';


// for any X|Y pair, X must be printed before Y
// { x1 : [y1, y2, y3] }
let printingOrder = {};


function run() {
    const elements = readFileSync('./day05/input/input1.txt', 'utf-8').split('\n\n');
    // X|Y -> X printed before Y
    const pageOrder = elements[0].split('\n').map((page) => page.split('|').map(Number));
    const pagesToPrint = elements[1].split('\n').map((page) => page.split(',').map(Number));

    pageOrder.forEach(([x, y]) => {
        if (!printingOrder[x]) {
            printingOrder[x] = [];
        }
        printingOrder[x].push(y);
    });

    let middleElements = pagesToPrint.map(pages => {
        let isValid = true;
        for (let i = 0; isValid && i < pages.length - 1; i++) {
            for (let j = i + 1; isValid && j < pages.length; j++) {                
                if (printingOrder[pages[i]]) {
                    // { a: [b, c] }
                    if (!printingOrder[pages[i]].includes(pages[j])) {
                        // ! [b, c].includes(d)
                        if (printingOrder[pages[j]] && printingOrder[pages[j]].includes(pages[i])) {
                            // { d : [a, e] } and [a, e].includes(a)
                            isValid = false;
                        }
                    }
                }
                else if (printingOrder[pages[j]]) {
                    // d: [a, e]
                    if (printingOrder[pages[j]].includes(pages[i])) {
                        // [a, e].includes(a)
                        isValid = false;
                    }
                }
            }
        }

        if (isValid) {
            return pages[Math.floor(pages.length / 2)];
        }
        else return 0;
    });
    
    return middleElements.reduce((acc, val) => acc + val, 0);
}

export default run;