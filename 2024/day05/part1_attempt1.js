import { readFileSync } from 'fs';
import { LinkedList } from 'structalgo';

// for any X|Y pair, X must be printed before Y
// { x1 : [y1, y2, y3] }
let printingOrder = {};


function toPrintBefore(page) {
    if (!printingOrder[page]) {
        return [];
    }
    return printingOrder[page];
}


function allFromAinB(a, b) {
    return a.every((x) => b.includes(x));
}


function run() {
    const elements = readFileSync('./day05/input/input1.txt', 'utf-8').split('\n\n');
    const pageOrder = elements[0].split('\n').map((page) => page.split('|').map(Number));
    const pagesToPrint = elements[1].split('\n').map((page) => page.split(',').map(Number));

    let linkedList = new LinkedList()
    linkedList.push(pageOrder[0][0]);

    pageOrder.forEach(([x, y]) => {
        let xIndex = linkedList.indexOf(x);
        let yIndex = linkedList.indexOf(y);

        if (xIndex === -1) {
            if (yIndex === -1) {
                linkedList.push(x);
                linkedList.push(y);
            }
            else if (yIndex === 0) {
                linkedList.unshift(x);
            }
            else {
                linkedList.insert(yIndex - 1, x);
            }
        }
        else if (xIndex === 0) {
            if (yIndex === -1) {
                linkedList.push(y);
            }
            else if (yIndex < xIndex) {
                linkedList.set(yIndex, x)
                linkedList.set(xIndex, y);
            }
        }
    });

    let validRowMiddleValues = [];
    pagesToPrint.map(pages => {
        let initialIndex = linkedList.indexOf(pages[0]);

        let isPageValid = true;
        pages.forEach(page => {
            let newIndex = linkedList.indexOf(page);
            if (newIndex < initialIndex) {
                isPageValid = false;
            }
        });

        if (isPageValid) {
            validRowMiddleValues.push(pages[Math.floor(pages.length / 2)])
        }
        else {
            console.log('initialIndex', initialIndex, 'pages', pages, 'linkedList', linkedList.toString());
        }
    });

    // 8830 is too high
    // 1066 is too low
    return validRowMiddleValues.reduce((acc, val) => acc + val, 0);
}

export default run;
  

/**
 * 
 * 
    pageOrder.forEach(([x, y]) => {
        if (!printingOrder[x]) {
            printingOrder[x] = [];
        }
        printingOrder[x].push(y);
        printingOrder[x] = [... new Set(printingOrder[x])].sort((a, b) => a - b);
    });

    // recursivity hits max stack size, so we need to do it iteratively
    const runNTimes = 100;
    for (let i = 0; i < runNTimes; i++) {
        Object.keys(printingOrder).forEach(x => {
            let before = printingOrder[x];
            before = [... new Set(before.map(y => toPrintBefore(y)).reduce((acc, val) => acc.concat(val), []))];

            printingOrder[x] = before;
        })
    }

    let validRowMiddleValues = [];
    pagesToPrint.map(pages => {
        let isRowValid = true;
        pages.forEach((page, index) => {
            let remainingPages = pages.slice(index + 1, pages.length);
            let printBefore = printingOrder[page];

            if (!allFromAinB(remainingPages, printBefore)) {
                isRowValid = false;
            }
        })

        if (isRowValid) {
            validRowMiddleValues.push(pages[Math.floor(pages.length / 2)])
        }
    })
 */