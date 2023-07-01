import { useState } from "react";

function TimeLength({ game, setGame, socket }) {
  const [timeLength, setTimeLength] = useState("");

  const timeRoll = () => {
    socket.emit("generate_time", game.id);
  };

  socket.on("time_update", (time) => {
    setTimeLength(time);
  });

  const timeConfirmation = () => {
    const updated = { ...game, playLength: timeLength, phase: 2 };
    socket.emit("update_game", updated);
  };

  return (
    <div className="GameArea">
      <p>
        This game is played in 4 cycles. Each cycle will be separated by a randomly-determined
        gap in time. These gaps may range in length from days, offering an intimate, close-textured story experience, to millennia, where what
        was once here may not survive these jumps in recognizable ways...
      </p>
      {!timeLength && <button onClick={timeRoll}>Find Cycle Length</button>}
      <h1>{timeLength}</h1>
      {timeLength && (
        <div className="confirmLength">
          <p>
            If the collective group feels that the given timeline is
            antagonistic to the story that you would like to tell, you may try
            again. However, try to think broadly; a story that was about a high
            school, may instead be about the fields that were there before, the
            place abandoned in the future, and the stones that are underneath it
            all. Conversely, a story that was at first glance about the
            movements of empire may narrow, instead focusing on one late-summer
            week, in a golden city that knows things are changing soon.
          </p>
          <button className="rerollLengthBtn" onClick={timeRoll}>
            New Cycle Length
          </button>
          <button className="confirmLengthBtn" onClick={timeConfirmation}>
            Confirm Cycle Length
          </button>
        </div>
      )}
    </div>
  );
}

export default TimeLength;
