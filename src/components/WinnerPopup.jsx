import Button from './Button'


function WinnerPopup({winner, onClick}) {
	return (
    <>
  		{ winner &&
        <div className='winner'>
          <h2 className='winner-title'>{winner} is winner 🥳</h2>
          <Button text='Continue' onClick={() => onClick()}></Button>
        </div>
      }
    </>
	)
}

export default WinnerPopup