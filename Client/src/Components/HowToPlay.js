import './HowToPlay.scss'
import CloseIcon from '@mui/icons-material/Close';
function HowToPlay({setRulesModal}) {
    
    const closeModal = () => {
        setRulesModal(false)
    }
    
        return (
          <div className='HowToPlay'>
            <div className='introduction'>
                <div className= 'headerContainer'><h2 className='introHeading'>The Ground Itself</h2><CloseIcon fontSize='large' onClick={closeModal} /></div>
                <p className="introText">
                    The Ground Itself is a game about places over time.
                </p>
                <p className="introText">  
                    Instead of roleplaying characters as in a traditional tabletop game you and 1-4 other players will be roleplaying a location and its history.
                    Play proceeds through a series of phases, each of which has a different set of rules and prompts.
                </p>
            </div>
            <div className='phasesContainer'>
                <div className='phase'>
                    <h3 className='phaseName'>Choosing Our Location</h3>
                    <p className='phaseDescription'>Talk with your other players and decide a location you'd all like to explore together. 
                    Locations can be incredibly broad like a city or an entire planet or incredibly specific like a single tree at the edge of a town.
                    </p>
                </div>
                <div className='phase'>
                    <h3 className='phaseName'>Choosing a Time Length</h3>
                    <p className='phaseDescription'>The length of time we're examining our place can last anywhere from a few hours to a few centuries.
                    Here your group will randomly generate a time length to be exploring your place.
                    </p>
                </div>
                <div className='phase'>
                    <h3 className='phaseName'>Establishing Our Place</h3>
                    <p className='phaseDescription'>
                        To establish a common understanding of your place in this phase you'll be answering questions about the physical and social aspects of your place as a group.
                    </p>
                </div>
                <div className='phase'>
                    <h3 className='phaseName'>Play Cycles</h3>
                    <p className='phaseDescription'>
                        Play cycles are the core of the game. Players will take turns answering prompts about our location and reacting to events as they unfold from the prompts that are generated. Periodically a cycle will
                        end with a dramatic event chosen and described by the player that ended the cycle. After the dramatic event is described we'll jump either forward or backwards in time to begin the next cycle. 
                    </p>
                </div>
                <div className='phase'>
                    <h3 className='phaseName'>Ending the Game</h3>
                    <p className='phaseDescription'>
                       When the 4th cycle ends the game is over. Players will answer one final question about the future of our place and then play will end.
                    </p>
                </div>
            </div>
            <div className='creditSection'>
                <p className="credits"><span className='gameTitle'>The Ground Itself</span> created by Everest Pipkin</p>
                <p className="credits">Online adaptation coded by David Daw</p>
                <p className="credits">Design by Nicole Thayer</p>
            </div>
          </div>
        );
      }
    
    export default HowToPlay