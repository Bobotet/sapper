import React, { FC, useMemo, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent'
import { v4 as uuidv4 } from 'uuid';
import { Cell } from '../models/Cell';

interface BoardComponentProps {
    board: Board,
    setBoard: (board: Board) => void
    setFlags: (flags: number) => void
    flags: number
    setWin: (win: boolean) => void
    setLose: (lose: boolean) => void
    lose: boolean
    win: boolean
}

const BoardComponent: FC<BoardComponentProps> = ({board, setBoard, setFlags, flags, setWin, setLose, lose, win}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    //Фукнция для обновления игрового поля
    const updateBoard= (cell: Cell) => {
        //Меняем state чтобы произошёл перерендер доски
        setSelectedCell(cell)
        const newBoard = board;
        setBoard(newBoard)
        checkWin()
      }

    const checkWin = () => {
        const win = board.checkWin();
        if(win) {
            setWin(true)
        }
    }
    //Отключает вызов контекстного меню при нажатии на правую кнопку мыши
    const handleMouseEvent = (e: any) => {
        e.preventDefault();
        return false
    };
    return (
        <div className='board' onContextMenu={handleMouseEvent}>
            {board.cells.map(row => 
                <div className='row' key={uuidv4()} >
                    {row.map(cell => 
                        <CellComponent cell={cell} key={uuidv4()} updateBoard={updateBoard} setFlags={setFlags} flags={flags} setLose={setLose} win={win} lose={lose}/>
                    )}                   
                </div>
            )}
        </div>
    )
}

export default BoardComponent