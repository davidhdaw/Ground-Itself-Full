function Focused({game, socket, userID}) {

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }
    
        return (
          <div className='Focused'>
            <h2>You Have Entered a FOCUSED SITUATION</h2>
            <p>Focused situations allow us to skip certain questions and instead spend more time on a single moment.</p>
            <p>In a focused situation you can</p>
            <h3>Tell a story</h3>
            <p>Invent a storytelling character in-game. Briefly describe them. As this character tell a story or legend known in our place. Other players may enter the scene as listeners.</p>
            <h3>Throw a party</h3>
            <p>The player describes the situation of a party like a ball or a spring festival. Every player picks or invents a character or thing that attends. Roleplay or narrate as characters. Characters can discuss topics from the larger story but try not to act on big things during the party. It's a party. Have fun.</p>
            <h3>Discover something</h3>
            <p>This is a chance to name a fact that enters the world whole cloth. Do not add details to past events- this is a discovery that is happening right now. Narrate what was discovered and why it's important.</p>
            <h3>See an omen</h3>
            <p>Here the player may gesture at a future possibility. An omen may be the classic type like a comet or simply a foreshadowing of future events like an heir to the throne that sickens ahead of a coup. This is a chance to set things in motion.</p>
            <h3>Leave the frame</h3>
            <p>Just fopr a second, the window widens and we are able to see a little bit more of our world. You can ask one question about the world outside of our place and the group collectively answers. Then the world snaps back.</p>
            <h3>Finally, you may move on, skipping this turn</h3>
            <hr></hr>
            <p>You can enter the same Focused situation multiple times.</p>
            
            {game.players[0].userID === userID && <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>}
            </div>
    
        
        );
      }
    
    export default Focused