import { useState } from "react";
import './TenAlert.scss'

function TenAlert({game, socket}) {

    const [pick, setPick] = useState(false)
    const [pickError, setPickError] = useState('')
    const userID = localStorage.getItem('userID');

    const nextQuestion = () => {
        socket.emit('10_phase', game.id)
        socket.emit('draw_question', game.id)
    }

    const picked = (event) => {
      if (game.players[0].userID === userID) {
        let gametoChange = game
        gametoChange.selectedTens.push(event.target.id)
        socket.emit('10_phase', game)
      } else {
        setPickError('Only the player who ended the cycle may choose a question.')
      }
    }

    socket.on('phase_10', () => {
      setPick(!pick)
    })

      if (pick === false) {
        return (
          <div className='TenQuestions'>
            <div className='tenExplanation'>
              <h2 className='tenHeading'>End of Gameplay Cycle {game.cycle-1}</h2>
              <p className='tenText'>With the end of this cycle a dramatic event has occured. The player who's turn ended the cycle chooses one of the following questions and the table collectively answers it.</p>
            </div>
            <div className="tenOptions" >
              { (!game.selectedTens.includes('gardens')) ?
              <div className='tenOption' id='gardens' onClick={(e) => picked(e)}>
              <p id='gardens'>1. The 'gardens' are planted, the work has been done, and now we wait. What was planted and what are we waiting for?</p>
              </div>
              :
              <div className='selectedOption' id='gardens'>
              <p id='gardens'>1. The 'gardens' are planted, the work has been done, and now we wait. What was planted and what are we waiting for?</p>
              </div>
              }
              { (!game.selectedTens.includes('victory')) ?
              <div className='tenOption' id='victory' onClick={(e) => picked(e)}>
              <p id='victory'>2. There is a great victory that enables the inhabitants of our place to build towards a new future. What is this future they wish for? How will they set to work on it?</p>
              </div>
              :
              <div className='selectedOption' id='victory'>
              <p id='victory'>2. There is a great victory that enables the inhabitants of our place to build towards a new future. What is this future they wish for? How will they set to work on it?</p>
              </div>
              }
              { (!game.selectedTens.includes('loss')) ?
              <div className='tenOption' id='loss' onClick={(e) => picked(e)}>
                <p id='loss'>3. There's a great loss, one that sets new burdens on the inhabitants of our place. How do they cope, and what have they lost forever?</p>
              </div>
              :
              <div className='selectedOption' id='loss'>
                <p id='loss'>3. There's a great loss, one that sets new burdens on the inhabitants of our place. How do they cope, and what have they lost forever?</p>
              </div>
              }
              { (!game.selectedTens.includes('death')) ?
              <div className='tenOption' id='death' onClick={(e) => picked(e)}>
                <p id='death'>4. Someone important (socially, politically, or emotionally) in our place dies. Who were they? and how were they killed? How are they remembered after?</p>
              </div>
              :
              <div className='selectedOption' id='death'>
                <p id='death'>4. Someone important (socially, politically, or emotionally) in our place dies. Who were they? and how were they killed? How are they remembered after?</p>
              </div>
              }
              { (!game.selectedTens.includes('resting')) ?
              <div className='tenOption' id='resting' onClick={(e) => picked(e)}>
                <p id='resting'>5. It is a resting day, in anticipation of problems just across the horizon. What is believed to be coming, and how do the inhabitants of our place set these problems aside, for just one day?</p>
              </div>
              :
              <div className='selectedOption' id='resting'>
                <p id='resting'>5. It is a resting day, in anticipation of problems just across the horizon. What is believed to be coming, and how do the inhabitants of our place set these problems aside, for just one day?</p>
              </div>
              }
            </div>
            {pickError !== '' && <p className='tenError'>{pickError}</p>}
          </div>
        )
      } else {
        return (
          <div className='TenAlert'>
            <div className='tenExplanation'>
              <h2 className='tenHeading'>End of Gameplay Cycle {game.cycle-1}</h2>
              <p className='tenText'>The current cycle has ended. The next phase of play will be <span className='newLength'>{game.roll} {game.playLength}</span> from now. You may move forward or backwards in time.</p>
              <p className='tenText'>This may be a narratively useful place to take a break. Take a few moments to talk about something else, grab a snack or do a small errand. This is probably a tiny gap compared with the one described in our story but consider allowing a moment to pass, and for the actions of our last cycle to fade just slightly into history.</p>
            </div>
            <p className="tenText reconvene">When the table reconvenes, you will collectively answer the following questions. The players may each answer one question in a circle or all chime in on each one. Try not to contradict other players, rather, work your own ideas into the fabric of what they said.</p>
            <div className='tenQuestionContainer'>
            <h4 className='tenQuestion'>Do our characters/Civilization Still live here?</h4>
            <p className="tenQuestionText">If not, who lives here now? Does Anyone?</p>
            <h4 className='tenQuestion'>What does the place physically look like now?</h4>
            <p className="tenQuestionText">Has anything visually changed? How does it smell now? How does it feel here?</p>
            <h4 className='tenQuestion'>Does the place still use the same name?</h4>
            <p className="tenQuestionText">If not, what is it called now, and who calls it that?</p>
            </div>
            <p className="tenText">After answering these questions press the button to resume the normal pattern of gameplay.</p>
            {game.players[0].userID === userID && <button className="newQuestionBtn" onClick={nextQuestion}>Next Cycle</button>}
            </div>
        );
      }


    
       
      }
    
    export default TenAlert