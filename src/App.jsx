import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'

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
      setWinner(null)
      setBoard(new Array(9).fill(null))
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

  useEffect(() => {
   checkWinner(board)
   updateRanking()
  }, [board, winner])

  return (
    <div className='container'>
      <h1 className='heading'>Tic Tac Toe</h1>
      {/*Choose character popup*/}
      <div className={!player ? 'choose__character active' : 'choose__character'}>
        <h2 className='choose__character-title'>Choose your character</h2>
        <div className='choose__character-actions'>
          <button className='choose__character-btn' onClick={() => handleChooseCharacter('x')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
          </button>
          <button className='choose__character-btn' onClick={() => handleChooseCharacter('o')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
          </button>
        </div>
      </div>
      {/*Ranking card*/}
      <div className='ranking'>
        <span className='ranking-item'>X's Wins: {ranking.x}</span>
        <span className='ranking-item'>O's Wins: {ranking.o}</span>
      </div>
      {/*Turn*/}
      <p className='turn'>Turn: {turn}</p>
      {/*Board game*/}
      <div className='board'>
        {
          board.map((item, index) => {
            return (
              <div className='board-item' key={index} onClick={() => handleClickBoard(index)}>
                {item === 'x' && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>)}
                {item === 'o' && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>)}
              </div>
            )
          })
        }
      </div>
      <button className='restart__btn' onClick={handleRestartBoard}>Restart Board</button>
      { player &&
        <p className='players'>User is "{player}", CPU is "{player === 'x' ? 'o' : 'x'}"</p>
      }
    </div>
  )
}

export default App