import { useState } from "react";
function TenAlert({game, socket}) {

    const [pick, setPick] = useState(false)
    const userID = localStorage.getItem('userID');

    const nextQuestion = () => {
        socket.emit('10_phase', game.id)
        socket.emit('draw_question', game.id)
    }

    const picked = () => {
      socket.emit('10_phase', game.id)
    }

    socket.on('phase_10', () => {
      setPick(!pick)
    })

      if (pick === false) {
        return (
          <div className='TenQuestions'>
            <h2>End of Gameplay Cycle: {game.cycle-1}</h2>
            <p>With the end of this cycle a dramatic event has occured. The player who's turn ended the cycle chooses one of the following questions and the table collectively answers it.</p>
            <p>The 'gardens' are planted, the work has been done, and now we wait. What was planted and what are we waiting for?</p>
            <p>There is a great victory that enables the inhabitants of our place to build towards a new future. What is this future they wish for? How will they set to work on it?</p>
            <p>There's a great loss, one that sets new burdens on the inhabitants of our place. How do they cope, and what have they lost forever?</p>
            <p>Someone important (socially, politically, or emotionally) in our place dies. Who were they? and how were they killed? How are they remembered after?</p>
            <p>It is a resting day, in anticipation of problems just across the horizon. What is believed to be coming, and how do the inhabitants of our place set these problems aside, for just one day?</p>
            {game.players[0].userID === userID && <button className="More10" onClick={picked}>Question Answered</button>}
          </div>
        )
      } else {
        return (
          <div className='TenAlert'>
            <h2>End of Gameplay Cycle: {game.cycle-1}</h2>
            <p>The current cycle has ended. The next phase of play will be</p>
            <h3>{game.roll} {game.playLength}</h3>
            <p>from now. You may move forward or backwards in time.</p>
            <p>This may be a narratively useful place to take a break. Take a few moments to talk about something else, grab a snack or do a small errand. This is probably a tiny gap compared with the one described in our story but consider allowing a moment to pass, and for the actions of our last cycle to fade just slightly into history.</p>
            <p>When the table reconvenes, you will collectively answer the following questions. The players may each answer one question in a circle or all chime in on each one. Try not to contradict other players, rather, work your own ideas into the fabric of what they said.</p>
            <h4>Do our characters/Civilization Still live here?</h4>
            <p>If not, who lives here now? Does Anyone?</p>
            <h4>What does the place physically look like now?</h4>
            <p>Has anything visually changed? How does it smell now? How does it feel here?</p>
            <h4>Does the place still use the same name?</h4>
            <p>If not, what is it called now, and who calls it that?</p>
            <p>After answering these questions press the button to resume the normal pattern of gameplay.</p>
            {game.players[0].userID === userID && <button className="newQuestionBtn" onClick={nextQuestion}>Next Cycle</button>}
            </div>
        );
      }


    
       
      }
    
    export default TenAlert