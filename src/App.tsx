import React, { useState, useMemo } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';

function App() {
  const [board, setBoard] = useState<Board>(new Board());
  const [win, setWin] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);
  const[flags, setFlags] = useState<number>(0);
  const[restart, setRestart] = useState<boolean>(false);
  const [minesCount, setMinesCount] = useState<number>(10)

  useMemo(() => {
    setRestart(false)
    setWin(false);
    setLose(false);
    setFlags(0)
    board.createCells(minesCount);
  }, [restart, minesCount])

  return (
    <div className="App">
      <div className='inf'>
        <p>Количество бомб на карте: {minesCount}</p>
        <p>Количество флажков: {flags}</p>
        <p>{win ? 'Победа' : lose ? 'Поражение' : ''}</p>
        <div>
          {win || lose ? <button className='btn' onClick={() => setRestart(true)}>Рестарт</button> : ''}
        </div>
        <select name="" id="" onChange={e => setMinesCount(+e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
        </select>
      </div>
      <BoardComponent board={board} setBoard={setBoard} setFlags={setFlags} flags={flags} setWin={setWin} setLose={setLose} lose={lose} win={win}/>
    </div>
  );
}

export default App;
