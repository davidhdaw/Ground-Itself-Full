function EndGame({game, socket}) {

    const endIt = () => {
        socket.emit('end_game', game.id)
        //clear local storage of game info
        //clear game info from State
        //renavigate to homepage
    }
    
        return (
          <div className='Ending'>
            <h2>The 4th cycle has ended and our game is over</h2>
            <p>Our window has fogged, and the clarity of vision we had into our place is lost to us. It may feel sudden but in truth there is never a clean exit. Places go on forever, building narrative by their mere existence.</p>
            <p>However, just because we cannot know for certain what takes place after the window of our game does not mean we cannot make some conjectures. After all, this is a game about long traces over time- by watching our place with such attention, maybe we learned to predict what could come to pass. As a group, without cards, decide on the following.</p>
            <p>The end of the game description goes here. The button under here should end the game, have you exit the room and send you back to the homepage. It currently does nothing.</p>
            <h3>What happens tomorrow in our place?</h3>
            <p>Who wakes up (does anyone)? What do they see, and what is the feeling they get from the world?</p>
            <p>Once you've answered this final question it's time to</p>
            <button className="newQuestionBtn" onClick={endIt}>End the Game</button>
          </div>
        );
      }
    
    export default EndGame