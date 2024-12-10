#!/usr/bin/env bash

read -p "Enter directory name [Ex.: day01]: "  DIR

if [ -d "$DIR" ]; then
  echo "Directory $DIR already exists, ignoring!"
else
  mkdir -p $DIR
  echo "Created $DIR!"
  touch $DIR/part1.js
  echo "import { readFileSync } from 'fs';


function run() {
    let lines = readFileSync('./`echo $DIR`/input/example.txt', 'utf-8').split('\n');
    
    return lines;
}

export default run;
  " >> $DIR/part1.js
  touch $DIR/part2.js
  echo "import { readFileSync } from 'fs';


function run() {
    let lines = readFileSync('./`echo $DIR`/input/example.txt', 'utf-8').split('\n');
    
    return lines;
}

export default run;
  " >> $DIR/part2.js
  touch $DIR/index.js
  echo "import part1 from './part1.js';
import part2 from './part2.js';

export {
  part1,
  part2
};
  " >> $DIR/index.js
  touch $DIR/README.md
  mkdir -p $DIR/input
  touch $DIR/input/input1.txt
  touch $DIR/input/input2.txt
  touch $DIR/input/example.txt
  cd $DIR
  touch package.json
  echo "{
  \"name\": \"`echo $DIR`\",
  \"version\": \"1.0.0\",
  \"description\": \"\",
  \"type\": \"module\",
  \"main\": \"index.js\",
  \"scripts\": {
    \"test\": \"jest\",
    \"start\": \"node index.js\"
  },
  \"keywords\": [],
  \"author\": \"\",
  \"license\": \"ISC\"
}
  " >> package.json
  npm install
  cd ..
  echo "Done!"
  npm i --save ./`echo $DIR`
fi