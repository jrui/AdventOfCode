import { readFileSync } from 'fs';

// for any X|Y pair, X must be printed before Y
// { x1 : [y1, y2, y3] }
let printingOrder = {};
let FILENAME = './day05/input/input2.txt';
let fixedRecords = {};


// a, b like x|y
function isValidOrderElements(a, b) {
    if (printingOrder[a]) {
        // { a: [b, c] }
        if (!printingOrder[a].includes(b)) {
            // ! [b, c].includes(d)
            if (printingOrder[b] && printingOrder[b].includes(a)) {
                // { d : [a, e] } and [a, e].includes(a)
                return false;
            }
            return true;
        }
        return true;
    }
    else if (printingOrder[b]) {
        // d: [a, e]
        if (printingOrder[b].includes(a)) {
            // [a, e].includes(a)
            return false;
        }
        return true;
    }
    return true;
}


function isValidOrder(pages) {
    let isValid = true;
    for (let i = 0; isValid && i < pages.length - 1; i++) {
        for (let j = i + 1; isValid && j < pages.length; j++) {                
            isValid = isValidOrderElements(pages[i], pages[j]);
        }
    }
    return isValid;
}


function getInvalidRecords() {
    const elements = readFileSync(FILENAME, 'utf-8').split('\n\n');
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
        let isValid = isValidOrder(pages);
        
        if (isValid) {
            return pages[Math.floor(pages.length / 2)];
        }
        else return 0;
    });
    
    return middleElements
        .map((value, index) => value === 0 ? pagesToPrint[index] : null)
        .filter(value => value);
}


// don't think brute force will work on this one.. have to think of a clever approach
function run() {
    const invalidRecords = getInvalidRecords();

    let newRecords = invalidRecords.map(record => {
        let originalRecord = record.map(r => r);
        let newRecord = [ record.pop() ];

        while (record.length > 0) {
            let inserting = record.pop();

            for (let i = 0; i < newRecord.length; i++) {
                let attempt1 = newRecord.slice(0, i + 1).concat(inserting).concat(newRecord.slice(i + 1));
                let attempt2 = newRecord.slice(0, i).concat(inserting).concat(newRecord.slice(i))

                // console.log(isValidOrder(attempt1) ? `${'attempt1 '+  attempt1}` : `${'attempt2 ' + attempt2}`);

                if (isValidOrder(attempt1)) {
                    newRecord = attempt1
                    break;
                }
                else if (isValidOrder(attempt2)) {
                    newRecord = attempt2
                    break;
                }
            }
        }

        fixedRecords[originalRecord] = newRecord;
        return newRecord
    });

    // console.log('out of', invalidRecords.length, 'we have fixed', Object.keys(fixedRecords).length);
    return newRecords
        .map(r => r[Math.floor(r.length / 2)])
        .reduce((acc, curr) => acc + curr, 0);
}

export default run;