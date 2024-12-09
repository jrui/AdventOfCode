import { readFileSync } from 'fs';

// for any X|Y pair, X must be printed before Y
// { x1 : [y1, y2, y3] }
let printingOrder = {};
let FILENAME = './day05/input/input2.txt';


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


function factorial(n) {
    let rval = 1;
    for (let i = 2; i <= n; i++)
        rval = rval * i;
    return rval;
}


function permutations(array) {
    if (!array.length) return [[]];
    return array.flatMap(x => {
        // get permutations of array without x, then prepend x to each
        return permutations(
                array.filter(v => v !== x)
            ).map(vs => [x, ...vs])
    });      
}


// don't think brute force will work on this one.. have to think of a clever approach
function run() {
    const invalidRecords = getInvalidRecords();

    console.log(printingOrder);

    let permutationsArr = invalidRecords.map(record => {
        console.log(`Processing record ${record} of ${invalidRecords.length}, possible permutations: ${factorial(record.length)}`);
        let validPermutation = permutations(record).filter(p => isValidOrder(p))[0];
        console.log(`Valid permutation found ${validPermutation}\n`);

        return validPermutation;
    });

    let middleElementSum = 0;
    permutationsArr.forEach(permutation => {
        middleElementSum += permutation[Math.floor(permutation.length / 2)];
    });

    return middleElementSum;
}

export default run;