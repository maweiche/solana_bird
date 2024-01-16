import React from "react";

export const GameOverText = () => {
  return (
    <center>
      <div className="game-over-message">
        Game Over!
        <br />
        <p
          style={{
            backgroundColor: "blue",
            padding: "2px 6px",
            borderRadius: "5px",
          }}
        >
          Click anywhere to Restart
        </p>
      </div>
    </center>
  );
};
