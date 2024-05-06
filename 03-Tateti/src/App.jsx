import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import confetti from "canvas-confetti"
import './App.css'

import { Square } from './components/Square'
import { TURNOS, WINNER_COMBOS } from './constants'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNOS.X
  })

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
        ){return (boardToCheck[a])}
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNOS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null )
  }

  const updateBoard = (index) =>{
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>TATETI</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
            })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn ===TURNOS.X}>{TURNOS.X}</Square>
        <Square isSelected={turn ===TURNOS.O}>{TURNOS.O}</Square>
      </section>


      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
