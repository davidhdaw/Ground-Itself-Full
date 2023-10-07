import './DrawingCards.scss'

function DrawingCards({game, socket}) {

  const userID = localStorage.getItem("userID");

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }

    const focusedSituation = () => {
        socket.emit('focused_situation', game.id)
    }

      return (
        <div className='DrawingCards'>
          <div className='questionContainer'>
          <h3 className='previousQuestion'>{game.questionsDrawn.length > 1 && game.questionsDrawn[game.questionsDrawn.length-2]}</h3>
          <h2 className='currentQuestion'>{game.questionsDrawn[game.questionsDrawn.length-1]}</h2>
          {
            (game.players[0].userID === userID) && game.questionsDrawn.length > 0 &&
            <button className="newPromptBtn" onClick={nextQuestion}>Next Prompt</button>
          }
          {
            (game.players[0].userID === userID) && game.questionsDrawn.length === 0 &&
            <button className="firstPromptBtn" onClick={nextQuestion}>Draw First Prompt</button>
          }
          
          </div>
          {
            (game.players[0].userID === userID) ?
            <div className='rulesSection'>
              <p>
                Read the question out loud, narrate your answer to the group and then press the button moving to the next turn. Other players may ask follow-up or clarifying questions but may not contradict what you've expressly said.
              </p>
              <hr></hr>
              <p>
                If you feel you have already answered this question during play or otherwise feel unwilling or unable to answer the question you may enter a Focused Situation as an alternative.
              </p>
              <button className="focusedSituationBtn" onClick={focusedSituation} userID={userID}>Focused Situation</button>
            </div>
            :
            <div className='rulesSection'>
              <p>
                Let the player whose turn it is narrate their answer to their question. You may ask follow-up or clarifying questions but may not contradict what you've expressly said.
              </p>
              <hr></hr>
            </div>
          }
          
          </div>
      
      );

      }
    
    export default DrawingCards