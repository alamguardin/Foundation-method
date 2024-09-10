import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Head from './components/Head'
import Board from './components/Board'
import Button from './components/Button'
import PlayersCard from './components/PlayersCard'
import CharacterPopup from './components/CharacterPopup'
import WinnerPopup from './components/WinnerPopup'

const winningCombination = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
]


function App() {
  const [board, setBoard] = useState(new Array(9).fill(null))
  const [turn, setTurn] = useState('x')
  const [winner, setWinner ] = useState(null)
  const [ranking, setRanking] = useState({x: 0, o: 0})
  const [player, setPlayer] = useState(null)

  const updateRanking = () => {
    if (winner !== null) {
      if (winner === 'x') {
        setRanking({...ranking, x: ranking.x + 1})
      } else if (winner === 'o') {
        setRanking({...ranking, o: ranking.o + 1})
      }
    }
  }

  const checkWinner = (board) => {
    let isWinner = null
    winningCombination.forEach(combination => {
      const boardItems = [board[combination[0]], board[combination[1]], board[combination[2]]]
      const isEqualToX = boardItems.every(item => item === 'x')
      const isEqualToO = boardItems.every(item => item === 'o')

      if (isEqualToX) { isWinner = 'x' }
      if (isEqualToO) { isWinner = 'o' }
    })

    if (isWinner !== null) setWinner(isWinner)

    return isWinner
  }

  const handleClickBoard = (index) => {
    const newBoard = [...board]

    if (newBoard[index] === null & winner === null) {
      newBoard[index] = turn
      setTurn(turn === 'x' ? 'o' : 'x')
      setBoard(newBoard)
    }
  }

  const handleRestartBoard = () => {
    setBoard(new Array(9).fill(null))
  }

  const handleChooseCharacter = (player) => {
    setPlayer(player)
  }

  const handleContinueGame = () => {
    setWinner(null)
    setBoard(new Array(9).fill(null))
  }

  useEffect(() => {
   checkWinner(board)
   updateRanking()
  }, [board, winner])

  return (
    <div className='container'>
      <WinnerPopup winner={winner} onClick={handleContinueGame}></WinnerPopup>
      <CharacterPopup player={player} onClick={handleChooseCharacter}></CharacterPopup>
      <Head rankingX={ranking.x} rankingO={ranking.o}></Head>
      <Board data={board} turn={turn} onClick={handleClickBoard}></Board>
      <Button text='Restart Board' onClick={handleRestartBoard}></Button>
      <PlayersCard player={player}></PlayersCard>
    </div>
  )
}

export default App