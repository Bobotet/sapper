import React, { FC, useMemo, useState } from 'react'
import { Cell } from '../models/Cell'
import { Board } from '../models/Board';

interface CellComponentProps {
    cell: Cell, 
    updateBoard: (cell: Cell) => void,
    setFlags: (flags: number) => void
    flags: number
    setLose: (lose: boolean) => void
    lose: boolean
    win: boolean
}

const CellComponent: FC<CellComponentProps> = ({cell, updateBoard, setFlags, flags, setLose, win, lose}) => {
  const [isOpenCell, setIsOpenCell] = useState<boolean>(cell.isOpen);
  const [isMarked, setIsMarked] = useState<boolean>(cell.isMarked);
  useMemo(() => {
    setIsOpenCell(cell.isOpen);
    setIsMarked(cell.isMarked);
  }, [])


  //Функция, которая вызывается при поражении
  const loseGame = () => {
    setLose(true)
  }

  //Функция, которая вызывается для открытия клетки
  const openCell = (e: any) => {
    if(!cell.isMarked && !win && !lose) {
      cell.setIsOpen(true);
      setIsOpenCell(true);
      updateBoard(cell)
      if(cell.mine) {
        loseGame()
      }
      else if(cell.number === 0) {
        openManyCells(cell)
      }      
    }
  }

  //Функция, котрая вызывается для открытия соседнйи клеток
  const openManyCells = (cell: Cell) => {
    cell.neighbors.forEach(neighbor => {
      updateBoard(neighbor)
      if(neighbor.number === 0 && !neighbor.isOpen && !neighbor.isMarked) {
        neighbor.setIsOpen(true)
        openManyCells(neighbor)
      }
      else if(!neighbor.mine && !neighbor.isMarked) {
        neighbor.setIsOpen(true)
      }

    })    
  }

  //Функция для маркировки клетки
  const markCell = (e: any) => {
    if(!cell.isOpen) {
      if(!cell.isMarked) {
        setIsMarked(true)
        cell.setIsMarked(true)
        setFlags(flags + 1);
      }
      else {
        setIsMarked(false)
        cell.setIsMarked(false)
        setFlags(flags - 1);
      }     
      updateBoard(cell) 
    }
  }

  //Функция, которая срабатывает при нажитии на клетку
  const cellClick = (e: any) => {
    if(e.button === 0) {
      openCell(e)
    }
    else if(e.button === 2) {
      markCell(e)
    }
  }

  return (
    <div className={['cell', cell.mine && (lose || win) ? 'mine' : isOpenCell ? 'openCell' : 'closeCell', isMarked ? 'markedCell' : ''].join(' ')}
          style={isOpenCell ? 
            {color: cell.color} 
            : {}
          } 
          onMouseUp={e => cellClick(e)}
    >
        {isOpenCell ? cell.number : ''}
    </div>
  )
}

export default CellComponent