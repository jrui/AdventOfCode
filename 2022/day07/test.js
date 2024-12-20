const fs = require('fs');

const Types = { FILE: "FILE", DIR: "DIR" };
const { DIR, FILE } = Types;

const parse = (input) =>
    input
        .split("$")
        .filter(Boolean)
        .map((blocks) => {
            const [input, ...outputs] = blocks.split("\n");
            const [, command, ...args] = input.split(" ");

            return {
                input: { command, args },
                outputs: outputs
                    .filter(Boolean)
                    .map((x) => x.split(" "))
                    .map(([head, rest]) => {
                        if (head === "dir") {
                            return { type: DIR, name: rest };
                        }
                        return {
                            type: FILE,
                            size: Number(head),
                            name: rest,
                        };
                    }),
            };
        });

const compute = (input) => {
    const parsed = parse(input);

    const dirTree = {
        name: "/",
        files: [],
        children: [],
        parent: null,
    };

    let currentNode = dirTree;
    const dirSizes = {};

    for (let i = 0, l = parsed.length; i < l; i++) {
        const {
            input: { command, args },
            outputs,
        } = parsed[i];

        if (!currentNode) {
            throw new Error("currentNode!");
        }

        if (command === "cd") {
            const [arg] = args;
            currentNode =
                arg === "/"
                    ? dirTree
                    : arg === ".."
                        ? currentNode.parent
                        : currentNode.children.find((dir) => dir.name === arg);
        } else if (command === "ls") {
            for (let j = 0; j < outputs.length; j++) {
                const node = outputs[j];
                const { size, type, name } = node;

                if (type === FILE) {
                    if (
                        !currentNode.files.find(
                            (file) => file.name === name
                        )
                    ) {
                        currentNode.files.push(node);

                        let nodeToUpdate = currentNode;

                        const path = [];
                        while (nodeToUpdate) {
                            path.unshift(nodeToUpdate.name);
                            nodeToUpdate = nodeToUpdate.parent;
                        }

                        path.reduce((currentPath, dirName) => {
                            currentPath.push(dirName);
                            const dirPath = currentPath.join("/");
                            dirSizes[dirPath] =
                                (dirSizes[dirPath] || 0) + size;
                            return currentPath;
                        }, []);
                    }
                } else if (type === DIR) {
                    if (
                        !currentNode.children.find(
                            (dir) => dir.name === name
                        )
                    ) {
                        currentNode.children.push({
                            name,
                            files: [],
                            children: [],
                            parent: currentNode,
                        });
                    }
                }
            }
        }
    }
    return dirSizes;
};

const part1 = (input) => {
    const dirSizes = compute(input);

    return Object.values(dirSizes)
        .filter((x) => x <= 100000)
        .reduce((a, b) => a + b, 0);
};

function parseFile(filename) {
    console.log('Reading file: ' + filename);
    const file = fs.readFileSync(filename, 'utf8');
    // @ts-ignore
    const lines = file.split('\n'); // add newline

    return lines;
}
console.log(part1(parseFile('./inputFiles/task1.txt').join('')));

const DISK_SPACE = 70000000;
const SPACE_TO_FREE = 30000000;

const part2 = (input) => {
    const dirSizes = compute(input);
    const filledSpace = DISK_SPACE - dirSizes["/"];
    return Math.min(
        ...Object.values(dirSizes).filter(
            (dirSize) => filledSpace + dirSize >= SPACE_TO_FREE
        )
    );
};