import './Focused.scss'

function Focused({game, socket}) {
    const userID = localStorage.getItem('userID');

    const nextQuestion = () => {
        socket.emit('draw_question', game.id)
    }
    
        return (
          <div className='Focused'>
            <div className='focusedExplanation'>
            <h2 className='focusedHeading'>Focused Situation</h2>
            <p className='focusedText'>Focused situations allow us to skip certain questions and instead spend more time on a single moment.</p>
            <p className='focusedText'>You can enter the same Focused Situation multiple times.</p>
            </div>
              <div className='situationList'>
                <div className='situationContainer'>
                  <h3 className='situationName'>Tell a story</h3>
                  <p className='situationDescription'>Invent a storytelling character in-game. Briefly describe them. As this character tell a story or legend known in our place. Other players may enter the scene as listeners.</p>
                </div>
                <div className='situationContainer'>
                  <h3 className='situationName'>Throw a party</h3>
                  <p className='situationDescription'>The player describes the situation of a party like a ball or a spring festival. Every player picks or invents a character or thing that attends. Roleplay or narrate as characters. Characters can discuss topics from the larger story but try not to act on big things during the party. It's a party. Have fun.</p>
                </div>
                <div className='situationContainer'>
                  <h3 className='situationName'>Discover something</h3>
                  <p className='situationDescription'>This is a chance to name a fact that enters the world whole cloth. Do not add details to past events- this is a discovery that is happening right now. Narrate what was discovered and why it's important.</p>
                </div>
                <div className='situationContainer'>
                  <h3 className='situationName'>See an omen</h3>
                  <p className='situationDescription'>Here the player may gesture at a future possibility. An omen may be the classic type like a comet or simply a foreshadowing of future events like an heir to the throne that sickens ahead of a coup. This is a chance to set things in motion.</p>
                </div>
                <div className='situationContainer'>
                  <h3 className='situationName'>Leave the frame</h3>
                  <p className='situationDescription'>Just fopr a second, the window widens and we are able to see a little bit more of our world. You can ask one question about the world outside of our place and the group collectively answers. Then the world snaps back.</p>
                </div>
                <div className='situationContainer dummy'>
                </div>
            </div>  
            
            {game.players[0].userID === userID && <button className="newQuestionBtn" onClick={nextQuestion}>Next Question</button>}
            </div>
    
        
        );
      }
    
    export default Focused