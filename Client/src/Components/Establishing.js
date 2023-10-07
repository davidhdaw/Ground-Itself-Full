import './Establishing.scss'

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
      <div className='establishing'>
        {(!game.establishingDrawn.length || game.establishingDrawn.length < 2) && <h3 className='establishingHeader'>Establishing Our Place</h3>}
        {game.establishingDrawn.length > 1 && <h3 className='previousEstablishing'>{game.establishingDrawn[game.establishingDrawn.length-2]}</h3>}
        {game.establishingDrawn.length !== 0 && <h2 className='drawnEstablishing'>{game.establishingDrawn[game.establishingDrawn.length-1]}</h2>}
        <p className='establishingRules'>Players should take turns answering the prompts to establish the nature of our place. Keep going until the world feels established or there are no more questions, whichever happens first. Try to keep this discussion under 25 minutes. You may wish to make brief notes to jog your memory later</p>
        {game.establishingOptions.length !== 0 && game.establishingDrawn.length !== 0 && <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>}
        {game.establishingOptions.length !== 0 && game.establishingDrawn.length === 0 && <button className="newQuestionBtn" onClick={nextQuestion}>First Question</button>}
        {game.establishingDrawn.length > 3 && <span className='btnSeperater'></span>}
        {game.establishingDrawn.length > 3 && <button className="confirmBtn" onClick={phase3}>End Phase</button>}  
      </div>

    
    );
  }

export default Establishing