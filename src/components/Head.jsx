function Head({rankingX, rankingO}) {
	return (
		<>
			<h1 className='heading'>Tic Tac Toe</h1>
			<div className='ranking'>
        <span className='ranking-item'>X's Wins: {rankingX}</span>
        <span className='ranking-item'>O's Wins: {rankingO}</span>
      </div>
		</>
	)
}

export default Head