function DrawingCards({game, socket}) {

  const userID = localStorage.getItem("userID");

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }

    const focusedSituation = () => {
        socket.emit('focused_situation', game.id)
    }

    if (game.players[0].userID === userID) {
      return (
        <div className='DrawingCards'>
          <h2>Gameplay Cycle: {game.cycle}</h2>

          {game.questionsDrawn.length !== 0 && <h3>Current Question:</h3>}
          <h3>{game.questionsDrawn[game.questionsDrawn.length-1]}</h3>
          <p>
              If it is your turn read the question out loud, narrate your answer to the group and then press the button moving to the next turn. Other players may ask follow-up or clarifying questions but may not contradict what you've expressly said.
          </p>
          <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>
          <hr></hr>
          <p>If you feel you have already answered this question during play or otherwise feel unwilling or unable to answer the question you may enter a Focused Situation as an alternative.</p>
          <button className="focusedSituationBtn" onClick={focusedSituation} userID={userID}>Focused Situation</button>
          </div>
      
      );
    } else {
      return (
        <div className='DrawingCards'>
          <h2>Gameplay Cycle: {game.cycle}</h2>
          {game.questionsDrawn.length !== 0 && <h3>Current Question:</h3>}
          <h3>{game.questionsDrawn[game.questionsDrawn.length-1]}</h3>
          <p>
              If it is your turn read the question out loud, narrate your answer to the group and then press the button moving to the next turn. Other players may ask follow-up or clarifying questions but may not contradict what you've expressly said.
          </p>
          <hr></hr>
          <p>If the current player feels the group has already answered this question during play or otherwise feel unwilling or unable to answer the question they may enter a Focused Situation as an alternative.</p>
        </div>
      
      );
    }
    

      }
    
    export default DrawingCards