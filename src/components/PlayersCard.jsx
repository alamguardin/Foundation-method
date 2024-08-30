function PlayersCard({player}) {
	return (
		<>
			{ player &&
        <p className='players'>User is "{player}", CPU is "{player === 'x' ? 'o' : 'x'}"</p>
      }
		</>
	)
}

export default PlayersCard