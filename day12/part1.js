import { readFileSync } from 'fs';


function run() {
    const lines = readFileSync('./day12/input/example.txt', 'utf-8').split('\n');

    let sum = 0;
    lines.forEach(line => {
        const [conditions, check] = line.split(' ');

        let singleConditionExpansion = [];
        conditions.split('').forEach(cond => {
            if (cond === '?') {
                singleConditionExpansion = singleConditionExpansion.concat(singleConditionExpansion);
                if (singleConditionExpansion.length === 0) {
                    singleConditionExpansion.push('.');
                    singleConditionExpansion.push('#');
                }
                else {
                    let temp = singleConditionExpansion.slice();
                    for (let i = 0; i < singleConditionExpansion.length; i++) {
                        singleConditionExpansion[i] = singleConditionExpansion[i] + '.';
                    }
                    for (let i = 0; i < temp.length; i++) {
                        temp[i] = temp[i] + '#';
                    }
                    singleConditionExpansion = singleConditionExpansion.concat(temp);
                }
            }
            else {
                if (singleConditionExpansion.length === 0) {
                    singleConditionExpansion.push(cond);
                }
                else {
                    for (let i = 0; i < singleConditionExpansion.length; i++) {
                        singleConditionExpansion[i] = singleConditionExpansion[i] + cond;
                    }
                }
            }

            singleConditionExpansion = [...new Set(singleConditionExpansion)];
        });

        let temp = singleConditionExpansion.filter(cond => {
            let fields = check.split(',').map(field => parseInt(field));
            let match = cond.split('.').filter(field => field.length !== 0).map(field => field.length);

            return fields.length === match.length && fields.every((val, index) => val === match[index]);
        });
        
        sum += temp.length;
        // console.log(temp)
    });

    return sum;
}


export default run;