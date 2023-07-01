function DrawingCards({game, socket}) {

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }

    const focusedSituation = () => {
        socket.emit('focused_situation', game.id)
    }
    
        return (
          <div className='DrawingCards'>
            <h2>Gameplay Cycle: {game.cycle}</h2>

            <h3>{game.questionsDrawn[game.questionsDrawn.length-1]}</h3>
            <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>
            <p>If you feel you have already answered this question during play or otherwise feel unwilling or unable to answer the question you may enter a Focused Situation as an alternative.</p>
            <button className="focusedSituationBtn" onClick={focusedSituation}>Focused Situation</button>
            </div>
    
        
        );
      }
    
    export default DrawingCards