import { readFileSync } from 'fs';

// for any X|Y pair, X must be printed before Y
// { x1 : [y1, y2, y3] }
let printingOrder = {};
let FILENAME = './day05/input/input2.txt';
// out of 104 we have fixed 27
let fixedRecords = {
    '77,47,19,34,53': [ 47, 53, 77, 19, 34 ],
    '77,14,54,87,89': [ 87, 54, 89, 77, 14 ],
    '55,96,47,44,42,25,66': [ 96, 47, 55, 42, 25, 44, 66 ],
    '37,33,64,85,18,62,36': [ 37, 18, 85, 33, 62, 64, 36 ],
    '53,97,36,59,13': [ 36, 53, 59, 97, 13 ],
    '68,15,27,71,62': [ 15, 62, 68, 27, 71 ],
    '96,97,36,24,64,54,66': [ 96, 54, 64, 36, 97, 24, 66 ],
    '78,13,19,84,22,98,23': [ 19, 98, 78, 13, 84, 22, 23 ],
    '22,23,15,17,34,68,76': [ 17, 34, 76, 22, 23, 15, 68 ],
    '71,87,36,53,68': [ 68, 87, 71, 36, 53 ],
    '94,87,27,33,21,89,76': [ 33, 76, 94, 27, 87, 21, 89 ],
    '37,84,68,94,23,96,15': [ 84, 37, 23, 15, 94, 68, 96 ],
    '77,19,17,89,56,42,34': [ 89, 77, 42, 19, 17, 34, 56 ],
    '54,97,59,94,88,53,25': [ 94, 54, 53, 88, 59, 25, 97 ],
    '77,42,51,72,97,49,19,56,67': [ 77, 42, 97, 19, 51, 67, 72, 56, 49 ],
    '19,78,25,79,84,59,24': [ 79, 59, 25, 24, 19, 78, 84 ],
    '77,42,36,47,55,32,97,51,88': [ 47, 36, 88, 55, 77, 42, 97, 32, 51 ],
    '79,71,11,94,54,56,21': [ 56, 94, 71, 54, 11, 21, 79 ],
    '53,89,11,54,34,25,47': [ 54, 11, 47, 53, 89, 25, 34 ],
    '14,51,67,88,55,98,37,13,25': [ 88, 55, 14, 25, 98, 51, 13, 67, 37 ],
    '96,15,94,84,11,87,72': [ 84, 72, 15, 94, 96, 87, 11 ],
    '18,19,84,24,25,44,32,98,85,76,17': [ 25, 44, 24, 19, 17, 98, 32, 84, 18, 85, 76 ],
    '23,67,84,15,13,78,71,37,22': [ 78, 13, 67, 84, 37, 22, 23, 15, 71 ],
    '36,56,68,87,37,85,47,64,49': [ 37, 56, 49, 85, 68, 87, 64, 47, 36 ],
    '71,94,87,18,64,49,13': [ 13, 18, 49, 94, 87, 71, 64 ],
    '33,84,22,85,23,19,66,34,56,31,72': [ 19, 66, 34, 84, 31, 72, 56, 85, 33, 22, 23 ],
    '23,49,62,15,68,18,76,33,53': [ 18, 49, 33, 76, 23, 15, 62, 68, 53 ]
};


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

    let alternative = invalidRecords.map(record => {
        for (let i = 0; i < record.length && !fixedRecords[record]; i++) {
            let newRecord = record.slice(0, i).concat(record.slice(i + 1));
            if (isValidOrder(newRecord)) {
                // if removing one is enough, we are done
                // console.log('attempting to remove', record[i], 'found valid record', newRecord);
                for (let j = 0; j < newRecord.length && !fixedRecords[record]; j++) {
                    // try to insert in a position where it is valid
                    let newRecord2 = newRecord
                        .slice(0, j + 1)
                        .concat(record[i])
                        .concat(newRecord.slice(j + 1));
                    
                    if (isValidOrder(newRecord2)) {
                        // console.log('found viable option for', record, 'as', newRecord2);
                        fixedRecords[record] = newRecord2;
                    }
                }
            }
            else {
                for (let j = 0; j < newRecord.length && !fixedRecords[record]; j++) {
                    let newRecord2 = newRecord
                        .slice(0, j)
                        .concat(newRecord.slice(j + 1));
                    
                    if (isValidOrder(newRecord2)) {
                        // console.log('attempting to remove [', record[i], newRecord[j], '] found valid record', newRecord2);
                        for (let k = 0; k < newRecord2.length && !fixedRecords[record]; k++) {
                            let newRecord3 = newRecord2
                                .slice(0, k + 1)
                                .concat(record[i])
                                .concat(newRecord2.slice(k + 1));
                            
                            if (isValidOrder(newRecord3)) {
                                for (let l = 0; l < newRecord3.length && !fixedRecords[record]; l++) {
                                    let newRecord4 = newRecord3
                                        .slice(0, l + 1)
                                        .concat(newRecord[j])
                                        .concat(newRecord3.slice(l + 1));

                                    if (isValidOrder(newRecord4)) {
                                        // console.log('found viable option for', record, 'as', newRecord4);
                                        fixedRecords[record] = newRecord4;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (let k = 0; k < newRecord2.length && !fixedRecords[record]; k++) {
                            let newRecord3 = newRecord2
                                .slice(0, k)
                                .concat(newRecord2.slice(k + 1));
                            
                            if (isValidOrder(newRecord3)) {
                                // console.log('attempting to remove [', record[i], newRecord[j], '] found valid record', newRecord3);
                                for (let l = 0; l < newRecord3.length && !fixedRecords[record]; l++) {
                                    let newRecord4 = newRecord3
                                        .slice(0, l + 1)
                                        .concat(record[i])
                                        .concat(newRecord3.slice(l + 1));
                                    
                                    if (isValidOrder(newRecord4)) {
                                        for (let m = 0; m < newRecord4.length && !fixedRecords[record]; m++) {
                                            let newRecord5 = newRecord4
                                                .slice(0, m + 1)
                                                .concat(newRecord[j])
                                                .concat(newRecord4.slice(m + 1));

                                            if (isValidOrder(newRecord5)) {
                                                for (let n = 0; n < newRecord5.length && !fixedRecords[record]; n++) {
                                                    let newRecord6 = newRecord5
                                                        .slice(0, n + 1)
                                                        .concat(newRecord2[k])
                                                        .concat(newRecord5.slice(n + 1));

                                                    if (isValidOrder(newRecord6)) {
                                                        // console.log('found viable option for', record, 'as', newRecord6);
                                                        fixedRecords[record] = newRecord6;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                for (let l = 0; l < newRecord3.length && !fixedRecords[record]; l++) {
                                    let newRecord4 = newRecord3
                                        .slice(0, l)
                                        .concat(newRecord3.slice(l + 1));
                                    
                                    if (isValidOrder(newRecord4)) {
                                        // console.log('attempting to remove [', record[i], newRecord[j], '] found valid record', newRecord4);
                                        for (let m = 0; m < newRecord4.length && !fixedRecords[record]; m++) {
                                            let newRecord5 = newRecord4
                                                .slice(0, m + 1)
                                                .concat(record[i])
                                                .concat(newRecord4.slice(m + 1));
                                            
                                            if (isValidOrder(newRecord5)) {
                                                for (let n = 0; n < newRecord5.length && !fixedRecords[record]; n++) {
                                                    let newRecord6 = newRecord5
                                                        .slice(0, n + 1)
                                                        .concat(newRecord[j])
                                                        .concat(newRecord5.slice(n + 1));

                                                    if (isValidOrder(newRecord6)) {
                                                        for (let o = 0; o < newRecord6.length && !fixedRecords[record]; o++) {
                                                            let newRecord7 = newRecord6
                                                                .slice(0, o + 1)
                                                                .concat(newRecord2[k])
                                                                .concat(newRecord6.slice(o + 1));

                                                            if (isValidOrder(newRecord7)) {
                                                                // console.log('found viable option for', record, 'as', newRecord7);
                                                                for (let p = 0; p < newRecord7.length && !fixedRecords[record]; p++) {
                                                                    let newRecord8 = newRecord7
                                                                        .slice(0, p + 1)
                                                                        .concat(newRecord3[l])
                                                                        .concat(newRecord7.slice(p + 1));

                                                                    if (isValidOrder(newRecord8)) {
                                                                        // console.log('found viable option for', record, 'as', newRecord8);
                                                                        fixedRecords[record] = newRecord8;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        for (let m = 0; m < newRecord4.length && !fixedRecords[record]; m++) {
                                            let newRecord5 = newRecord4
                                                .slice(0, m)
                                                .concat(newRecord4.slice(m + 1));
                                            
                                            if (isValidOrder(newRecord5)) {
                                                // console.log('attempting to remove [', record[i], newRecord[j], '] found valid record', newRecord5);
                                                for (let n = 0; n < newRecord5.length && !fixedRecords[record]; n++) {
                                                    let newRecord6 = newRecord5
                                                        .slice(0, n + 1)
                                                        .concat(record[i])
                                                        .concat(newRecord5.slice(n + 1));
                                                    
                                                    if (isValidOrder(newRecord6)) {
                                                        for (let o = 0; o < newRecord6.length && !fixedRecords[record]; o++) {
                                                            let newRecord7 = newRecord6
                                                                .slice(0, o + 1)
                                                                .concat(newRecord[j])
                                                                .concat(newRecord6.slice(o + 1));

                                                            if (isValidOrder(newRecord7)) {
                                                                for (let p = 0; p < newRecord7.length && !fixedRecords[record]; p++) {
                                                                    let newRecord8 = newRecord7
                                                                        .slice(0, p + 1)
                                                                        .concat(newRecord2[k])
                                                                        .concat(newRecord7.slice(p + 1));

                                                                    if (isValidOrder(newRecord8)) {
                                                                        for (let q = 0; q < newRecord8.length && !fixedRecords[record]; q++) {
                                                                            let newRecord9 = newRecord8
                                                                                .slice(0, q + 1)
                                                                                .concat(newRecord3[l])
                                                                                .concat(newRecord8.slice(q + 1));

                                                                            if (isValidOrder(newRecord9)) {
                                                                                for (let r = 0; r < newRecord9.length && !fixedRecords[record]; r++) {
                                                                                    let newRecord10 = newRecord9
                                                                                        .slice(0, r + 1)
                                                                                        .concat(newRecord4[m])
                                                                                        .concat(newRecord9.slice(r + 1));

                                                                                    if (isValidOrder(newRecord10)) {
                                                                                        // console.log('found viable option for', record, 'as', newRecord10);
                                                                                        fixedRecords[record] = newRecord10;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                for (let n = 0; n < newRecord5.length && !fixedRecords[record]; n++) {
                                                    let newRecord6 = newRecord5
                                                        .slice(0, n)
                                                        .concat(newRecord5.slice(n + 1));
                                                    
                                                    if (isValidOrder(newRecord6)) {
                                                        // console.log('attempting to remove [', record[i], newRecord[j], '] found valid record', newRecord6);
                                                        for (let o = 0; o < newRecord6.length && !fixedRecords[record]; o++) {
                                                            let newRecord7 = newRecord6
                                                                .slice(0, o + 1)
                                                                .concat(record[i])
                                                                .concat(newRecord6.slice(o + 1));
                                                            
                                                            if (isValidOrder(newRecord7)) {
                                                                for (let p = 0; p < newRecord7.length && !fixedRecords[record]; p++) {
                                                                    let newRecord8 = newRecord7
                                                                        .slice(0, p + 1)
                                                                        .concat(newRecord[j])
                                                                        .concat(newRecord7.slice(p + 1));

                                                                    if (isValidOrder(newRecord8)) {
                                                                        for (let q = 0; q < newRecord8.length && !fixedRecords[record]; q++) {
                                                                            let newRecord9 = newRecord8
                                                                                .slice(0, q + 1)
                                                                                .concat(newRecord2[k])
                                                                                .concat(newRecord8.slice(q + 1));

                                                                            if (isValidOrder(newRecord9)) {
                                                                                for (let r = 0; r < newRecord9.length && !fixedRecords[record]; r++) {
                                                                                    let newRecord10 = newRecord9
                                                                                        .slice(0, r + 1)
                                                                                        .concat(newRecord3[l])
                                                                                        .concat(newRecord9.slice(r + 1));

                                                                                    if (isValidOrder(newRecord10)) {
                                                                                        for (let s = 0; s < newRecord10.length && !fixedRecords[record]; s++) {
                                                                                            let newRecord11 = newRecord10
                                                                                                .slice(0, s + 1)
                                                                                                .concat(newRecord4[m])
                                                                                                .concat(newRecord10.slice(s + 1));

                                                                                            if (isValidOrder(newRecord11)) {
                                                                                                for (let t = 0; t < newRecord11.length && !fixedRecords[record]; t++) {
                                                                                                    let newRecord12 = newRecord11
                                                                                                        .slice(0, t + 1)
                                                                                                        .concat(newRecord5[n])
                                                                                                        .concat(newRecord11.slice(t + 1));

                                                                                                    if (isValidOrder(newRecord12)) {
                                                                                                        // console.log('found viable option for', record, 'as', newRecord12);
                                                                                                        fixedRecords[record] = newRecord12;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    console.log(fixedRecords);
    console.log('found', Object.keys(fixedRecords).length - 21, 'new records');
    console.log('out of', invalidRecords.length, 'we have fixed', Object.keys(fixedRecords).length);
    // to be honest i implemented the manual removal and re-insertion of 2 elements and at this point I
    // have given up control of the code to github copilot...
    // I have no idea on what is going on anymore
    return 0;
}

export default run;