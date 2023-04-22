import { Cell } from "./Cell";

export class Board {
    cells: Cell[][] = []
    createCells(minesCount: number) {
        this.cells = [];
        let index = 0;
        for(let i = 0; i < 10; i++) {
            this.cells.push([])
            for(let j = 0; j < 10; j++) {
                this.cells[i].push(new Cell(j, i, index));
                index += 1;
            }
        }
        this.createMines(minesCount)
    }
    
    createMines(minesCount: number) {
        const maxCells = 100;
        const minesArr: Array<number> = [];
        // Заполняем массив с минами неповторяющимися значениями
        while(minesArr.length < minesCount) {
            let randomCell = Math.floor(Math.random() * maxCells);
            let copy = false;
            for(let j = 0; j < minesArr.length; j++) {
                if(minesArr[j] === randomCell) {
                    copy = true;
                    break
                }
            }
            if(!copy) {
                minesArr.push(randomCell)
            }
        }

        //Добавляем мины на поле
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                minesArr.forEach(mine => {
                    if(this.cells[i][j].index === mine) {
                        this.cells[i][j].setMine()
                    }
                })
            }
        }
        this.addNeighbors()
    }

    addNeighbors() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                let neighbors: Cell[] = []; 
                if(this.cells[i + 1] !== undefined && this.cells[i + 1][j + 1] !== undefined) {
                    neighbors.push(this.cells[i + 1][j + 1])
                }
                if(this.cells[i + 1] !== undefined && this.cells[i + 1][j] !== undefined) {
                    neighbors.push(this.cells[i + 1][j])
                }
                if(this.cells[i][j + 1] !== undefined) {
                    neighbors.push(this.cells[i][j + 1])
                }
                if(this.cells[i - 1] !== undefined && this.cells[i - 1][j - 1] !== undefined) {
                    neighbors.push(this.cells[i - 1][j - 1])
                }
                if(this.cells[i + 1] !== undefined &&  this.cells[i + 1][j - 1] !== undefined) {
                    neighbors.push(this.cells[i + 1][j - 1])
                }
                if(this.cells[i - 1] !== undefined && this.cells[i - 1][j + 1] !== undefined) {
                    neighbors.push(this.cells[i - 1][j + 1])
                }
                if(this.cells[i - 1] !== undefined && this.cells[i - 1][j] !== undefined) {
                    neighbors.push(this.cells[i - 1][j])
                }
                if(this.cells[i][j - 1] !== undefined) {
                    neighbors.push(this.cells[i][j - 1])
                }
                this.cells[i][j].setNeighbors(neighbors);
            }
        }
        this.createCellNumbers()
    }

    createCellNumbers() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                if(!this.cells[i][j].mine) {
                    let cellNumber: number = 0;
                    this.cells[i][j].neighbors.forEach(neighbor => {
                        if (neighbor.mine) {
                            cellNumber += 1;
                        }
                    })
                    this.cells[i][j].setNumber(cellNumber)
                }
            }
        }
    }
    checkWin() {
        let win = true
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                if((this.cells[i][j].mine && !this.cells[i][j].isMarked) || (!this.cells[i][j].mine && this.cells[i][j].isMarked)) {
                    win = false
                }
            }
        }
        return win
    }
}