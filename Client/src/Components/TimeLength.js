import { useState } from "react";

function TimeLength({game, setGame}) {
    
    const timeLengths = ["Days", "Weeks", "Years", "Decades", "Centuries", "Millenia"]
    
    const[timeLength, setTimeLength] = useState('')
    
    const timeRoll = () => {
        setTimeLength(timeLengths[Math.floor(Math.random()*6)])
    }

    const timeConfirmation = () => {
        setGame({...game,
        playLength: timeLength,
        phase: 2
        })
    }

    return (
      <div className='GameArea'>
        <p>This game is played in 4 cycles, and each cycle is separated by
        a gap in time. These gaps are determined randomly and may range in size from
        days, which might lend itself to an intimate and close-textured story, to millennia, 
        where what was here may not survive these jumps in recognizable ways. </p>
        {!timeLength && <button onClick={timeRoll}>Find Cycle Length</button>}
        <h1>{timeLength}</h1>
        {timeLength && 
        <div className="confirmLength">
            <p>If the collective group feels that the given timeline is
            antagonistic to the story that you would like to tell, you may
            try again. However, try to think broadly; a story that was about a
            high school, may instead be about the fields that were there
            before, the place abandoned in the future, and the stones that
            are underneath it all. Conversely, a story that was at first
            glance about the movements of empire may narrow, instead
            focusing on one late-summer week, in a golden city that knows
            things are changing soon.</p>
            <button className="rerollLengthBtn" onClick={timeRoll}>New Cycle Length</button>
            <button className="confirmLengthBtn" onClick={timeConfirmation}>Confirm Cycle Length</button>
        </div>}

      </div>
    );
  }


export default TimeLength