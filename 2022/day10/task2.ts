import * as fs from 'fs';

function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}


function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');
    let sprite: string[] = "###.....................................".split("");
    let current: string = "";
    let cycle: number = 0;
    let X: number = 0;

    lines.forEach((line: string) => {
        const cmd: string[] = line.split(" ");
        // console.log(cmd);
        if (cmd.length === 1) {
            // noop cycle
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            } else {
                current += ".";
            }
        } else if (cmd.length === 2) {
            // add Y cycle 1
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            } else {
                current += ".";
            }
            // console.log(cycle, current);
            // console.log(sprite.join(""));
            // console.log("\n");

            // add Y cycle 2
            cycle++;
            if (sprite[(cycle - 1) % 40] === "#") {
                current += "#";
            } else {
                current += ".";
            }

            // end of cycle 2
            sprite[X + 0] = ".";
            sprite[X + 1] = ".";
            sprite[X + 2] = ".";
            X += parseInt(cmd[1]);
            sprite[X + 0] = "#";
            sprite[X + 1] = "#";
            sprite[X + 2] = "#";
            // console.log(cycle, current);
            // console.log(sprite.join(""));
        }
    })

    console.log("PART 2 :");
    let line: string = "";
    for (let i = 0; i < 240; i++) {
        if (i % 40 === 0) {
            console.log(line);
            line = "";
        }
        line += current[i];
    }
    return line;
}


console.log(solution());
export { solution };