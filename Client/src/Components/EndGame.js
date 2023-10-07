import './EndGame.scss'
function EndGame({game, socket}) {

    const endIt = () => {
        socket.emit('end_game', game.id)
    }
    
        return (
          <div className='Ending'>
            <div className='endingInfo'>
            <h2 className='endingHeading'>The 4th cycle has ended and our game is over</h2>
            <p className="endingText">Our window has fogged, and the clarity of vision we had into our place is lost to us. It may feel sudden but in truth there is never a clean exit. Places go on forever, building narrative by their mere existence.
            However, just because we cannot know for certain what takes place after the window of our game does not mean we cannot make some conjectures. 
            After all, this is a game about long traces over time- by watching our place with such attention, maybe we learned to predict what could come to pass. 
            As a group answer one final question.</p>
            <div className='lastQuestion'>
            <h3 className='lastHeading'>What happens tomorrow in our place?</h3>
            <p className='lastText'>Who wakes up (does anyone)? What do they see, and what is the feeling they get from the world?</p>
            </div>
            </div>

            <div className='exitContainer'>
            <p>Once you've answered this final question it's time to</p>
            <button className="newQuestionBtn" onClick={endIt}>End the Game</button>
            </div>
          </div>
        );
      }
    
    export default EndGame