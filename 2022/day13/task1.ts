import * as fs from 'fs';
import * as _ from 'lodash';
import {first} from "lodash";


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


let values: Record<any, any> = {};
function solution(): any {
    let index: number = 1;
    const lines: string[] = parseFile('inputFiles/example.txt');
    lines.map((line: string, index: number) => {
        if (line === '') {
            index++;
        }
        else {
            if (!values[index]) {
                values[index] = {};
                values[index]['first'] = JSON.parse(line);
            }
            else values[index]['second'] = JSON.parse(line);
        }
    });

    return values;
}


console.log(solution());
export { solution, parseFile };
