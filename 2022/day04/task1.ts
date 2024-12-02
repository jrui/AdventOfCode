import * as fs from 'fs';

const range = (low: number, high: number) => Array.from({ length: high - low + 1 }, (_, i) => low + i);
const every = (r1: number[], r2: number[]) => r1.every((r) => r2.includes(r)) || r2.every((r) => r1.includes(r));

function parseFile(filename: string): string[] {
    console.log('Reading file: ' + filename);
    const file: string = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines: string[] = file.split('\n'); // add newline

    return lines;
}

const createSections = (input: string[]) => {
    return input.reduce((acc: number[][], line) => {
        const sections = line.split(",").reduce((sections: number[], section) => {
            section.split("-").forEach((area) => sections.push(Number(area)));
            return sections;
        }, []);
        acc.push(sections);
        return acc;
    }, []);
};

function solution(): any {
    const lines: string[] = parseFile('inputFiles/task1.txt');

    return createSections(lines).reduce((overlap, area) => {
        const [elf1, elf2] = [range(area[0], area[1]), range(area[2], area[3])];
        if (every(elf1, elf2)) overlap += 1;
        return overlap;
    }, 0);
}


console.log(solution());
export { solution };

