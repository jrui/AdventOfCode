#!/bin/zsh

# This script is used to initialize a new day's repo
# It will create a new directory with the current date
mkdir day$(date +%d)
cd day$(date +%d)
touch package.json

echo "{
  \"name\": \"day$(date +%d)\",
  \"version\": \"1.0.0\",
  \"description\": \"\",
  \"main\": \"task1.ts\",
  \"scripts\": {
    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",
    \"s:1\": \"npx tsc && npx ts-node task1.ts\",
    \"s:2\": \"npx tsc && npx ts-node task2.ts\"
  },
  \"author\": \"CaptainJRoy\",
  \"license\": \"ISC\"
}" >> package.json

mkdir inputFiles
cd inputFiles
touch task1.txt
cd ..


npm install -g typescript
npx tsc --init
npm i --save-dev @types/node
npm i --save ts-node
npm i --save fs
npm i --save mathjs
npm i --save lodash
npm i --save-dev @types/lodash

echo "# Day $(date +%d)" >> README.md

touch task1.ts
echo "import * as fs from 'fs';
import * as _ from 'lodash';


function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('n'); // add newline

    return lines;
}


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    // Write your code
    return 0;
}


console.log(solution());
export { solution, parseFile };" >> task1.ts

touch task2.ts
echo "import { solution as task1, parseFile } from './task1';
import * as _ from 'lodash';


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    // Write your code
    return 0;
}


console.log(solution());
export { solution };" >> task2.ts
