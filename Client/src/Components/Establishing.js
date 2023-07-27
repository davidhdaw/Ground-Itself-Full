function Establishing({game, socket}) {

const nextQuestion = () => {
    socket.emit('draw_establishing', game.id)
}

const phase3 = () => {
        const updated = {...game,
        phase: 3
        }
        socket.emit('update_game', updated)
    }


    return (
      <div className='Establishing'>
        <h2>Establishing Our Place</h2>
        <p>Players should take turns answering the prompts to establish the nature of our place. Keep going until the world feels established or there are no more questions, whichever happens first. Try to keep this discussion under 25 minutes. You may wish to make brief notes to jog your memory later</p>
        <h3>{game.establishingDrawn[game.establishingDrawn.length-1]}</h3>
        {game.establishingOptions.length !== 0 && <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>}
        <button className="confirmLengthBtn" onClick={phase3}>End Phase</button>
        </div>

    
    );
  }

export default Establishing

