export class Cell {
    constructor(x, y, symbol = '.') {
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.perimeter = 0;
        this.adjacent = [];
        this.validated = false;
        this.area = 0;
    }


    setAdjacent(cells) {
        this.adjacent = cells.filter(cell => this.isAdjacent(cell));
        this.perimeter = 4 - this.adjacent.length;
    }


    getGroup() {
        if (this.validated) {
            return [];
        }

        this.validated = true;
        let group = [this];

        this.adjacent
            .filter(cell => !cell.validated)
            .forEach(cell => group.push(...cell.getGroup()));

        return group;
    }


    isAdjacent(cell) {
        return cell.symbol === this.symbol
            && ((Math.abs(this.x - cell.x) === 1 && this.y - cell.y === 0)
            || (Math.abs(this.y - cell.y) === 1 && this.x - cell.x === 0));
    }
}