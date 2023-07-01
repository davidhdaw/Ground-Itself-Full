function EndGame({game, socket}) {

    const endIt = () => {
        
    }
    
        return (
          <div className='Ending'>
            <h2>End of Game</h2>
            <p>The end of the game description goes here. The button under here should end the game, have you exit the room and send you back to the homepage. It currently does nothing.</p>
            <button className="newQuestionBtn" onClick={endIt}>End Game</button>
            </div>
    
        
        );
      }
    
    export default EndGame