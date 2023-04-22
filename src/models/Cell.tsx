export class Cell {
    mine: boolean = false;
    x: number;
    y: number;
    index: number;
    number: number = 0;
    neighbors: Cell[] = [];
    isOpen: boolean = false;
    color: string = '';
    isMarked: boolean = false;


    constructor(x: number, y: number, index: number) {
        this.x = x;
        this.y = y;
        this.index = index;
    }

    setMine() {
        this.mine = true
    }
    setIsMarked(mark: boolean) {
        this.isMarked = mark
    }
    setNumber(number: number) {
        this.number = number;
        this.setColor(number)
    }
    setColor(number: number) {
        if (number === 1) {
            this.color = '#059bff'
        }
        else if (number === 2) {
            this.color = 'green'
        }
        else if (number === 3) {
            this.color = 'red'
        }
        else if (number === 4) {
            this.color = '#051aff'
        }
        else if (number === 5) {
            this.color = '#d1ca04'
        }
        else if (number === 6) {
            this.color = 'orange'
        }
        else if (number === 7) {
            this.color = '#ff05e6'
        }
        else if (number === 8) {
            this.color = '#9b05ff'
        }
    }
    setNeighbors(neighbors: Cell[]) {
        this.neighbors = neighbors;
    }
    setIsOpen(isOpen: boolean) {
        this.isOpen = isOpen
    }
}