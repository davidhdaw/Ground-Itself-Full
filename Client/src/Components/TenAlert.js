function TenAlert({game, socket}) {

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }
    
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
            <button className="newQuestionBtn" onClick={nextQuestion}>Next Cycle</button>
            </div>
    
        
        );
      }
    
    export default TenAlert