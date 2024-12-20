import { readFileSync } from "node:fs";

const lines = readFileSync("./inputFiles/task1.txt", { encoding: "utf-8" }) // read day??.txt content
    .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
    .trim() // Remove starting/ending whitespace
    .split("\n"); // Split on newline

// Return a new object to avoid side effects between part 1 and 2
function getInput() {
    const res: Record<any, any> = {
        start: {},
        end: {},
        map: [],
    };

    res.map = lines.map((line, y) =>
        [...line].map((value, x) => {
            if (value === "S") {
                res.start = {
                    y,
                    x,
                };
                return 0;
            }
            if (value === "E") {
                res.end = { y, x };
                return 25;
            }
            return value.charCodeAt(0) - "a".charCodeAt(0);
        })
    );
    return res;
}


function pointToInt(x: number, y: number): number {
    return y * 1e3 + x;
}


function intToPoint(int: number): Record<any, any> {
    return {
        y: Math.floor(int / 1e3),
        x: int % 1e3,
    }
}


function getNeighbors(x: number, y: number, map: Record<any, any>) {
    const res: Array<number> = [];
    if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
        res.push(pointToInt(x, y + 1));
    }
    if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
        res.push(pointToInt(x, y - 1));
    }
    if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
        res.push(pointToInt(x + 1, y));
    }
    if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
        res.push(pointToInt(x - 1, y));
    }

    return res;
}


function dijkstra(map: Record<any, any>, start: Record<any, any>, end: Record<any, any>) {
    const dist: Record<any, any> = {};
    const prev: Record<any, any> = {};
    let queue: Array<number> = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const id = pointToInt(x, y);
            dist[id] = Infinity;
            queue.push(id);
        }
    }
    dist[pointToInt(start.x, start.y)] = 0;

    while (queue.length) {
        let u: any = null;
        for (const current of queue) {
            if (u === null || dist[current] < dist[u]) {
                u = current;
            }
        }
        if (u === pointToInt(end.x, end.y)) {
            break;
        }
        queue = queue.filter((x) => x !== u);

        const point = intToPoint(u);
        const neighbors = getNeighbors(point.x, point.y, map);
        for (const v of neighbors) {
            if (queue.includes(v)) {
                const alt = dist[u] + 1;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
    }
    return {
        dist,
        prev,
    };
}


function solution() {
    const input = getInput();
    const data = dijkstra(input.map, input.start, input.end);
    const distance = data.dist[pointToInt(input.end.x, input.end.y)];

    return distance;
}


console.log(solution());
export { solution };