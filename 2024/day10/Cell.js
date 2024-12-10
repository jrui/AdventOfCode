export class Cell {
    constructor (x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.neighbors = [];
        this.reacheableNines = [];
        this.ninePaths = [];
    }


    processNines() {
        if (this.neighbors.length !== 0) {
            this.reacheableNines = this.neighbors
                .filter(cell => cell.value === 9)
                .map(cell => [cell.x, cell.y]);
            
            if (this.reacheableNines.length === 0) {
                this.reacheableNines.map(cell => cell.processNines());
            }

            this.reacheableNines = this.reacheableNines
                .concat(this.neighbors
                    .filter(cell => cell.reacheableNines.length !== 0 && cell.value !== 9)
                    .map(cell => cell.reacheableNines)
                    .filter(([x, y]) => !this.reacheableNines.includes([x, y]))
                    .flat()
                );
            
            this._removeDuplicateNeighboars();
        }
    }


    processNinePath(path = [[this.x, this.y]]) {
        // I think this has a bug somewhere but somehow it works
        if (this.neighbors.length !== 0) {
            if (this.ninePaths.length === 0) {
                this.ninePaths.map(cell => cell.processNinePath(path.concat([[cell.x, cell.y]])));
            }

            this.ninePaths = this.neighbors
                .filter(cell => cell.value === 9)
                .map(cell => path.concat([[cell.x, cell.y]]));
            
            this.ninePaths = this.ninePaths
                .concat(this.neighbors
                    .filter(cell => cell.ninePaths.length !== 0 && cell.value !== 9)
                    .map(cell => cell.ninePaths)
                    .filter(([x, y]) => !this.ninePaths.includes([x, y]))
                    .flat()
                );
        }
    }


    processNeighbors(cells) {
        this.neighbors = cells.filter(cell => {
            return cell.value === this.value + 1
            && Math.abs(cell.x - this.x) <= 1
            && Math.abs(cell.y - this.y) <= 1
            && Math.abs(cell.x - this.x) + Math.abs(cell.y - this.y) !== 2
        });

        if (this.neighbors.length !== 0) {
            this.neighbors.map(cell => cell.processNeighbors(cells));
            this.processNines();
            this.processNinePath();
        }
    }


    _removeDuplicateNeighboars() {
        let hash = {};
        let out = [];

        for (let i = 0; i < this.reacheableNines.length; i++) {
            let key = this.reacheableNines[i].join('|');
            if (!hash[key]) {
                out.push(this.reacheableNines[i]);
                hash[key] = 'found';
            }
        }

        this.reacheableNines = out;
    }
}