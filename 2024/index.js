import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

// read day from args
const day = process.argv[2];

// case day null or undefined print command usage
if (!day) {
    console.log('Usage: npm run day <day>');
    process.exit(1);
}

// get all days
const dir = fs.readdirSync('./');
// check if day exists
if (!dir.includes(`day${day.length === 1 ? '0' + day : day}`)) {
    console.log(`Day ${day} does not exist. Create it first using the ./init_day.sh script.`);
    process.exit(1);
}
else {
    const dayPath = path.join(`./day${day.length === 1 ? '0' + day : day}/index.js`);
    console.log(`Running day ${day}...`);
    import(dayPath).then(dayRun => {
        console.log(dayRun.part1());
        console.log(dayRun.part2());
    });
}