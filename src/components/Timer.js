import React from 'react';

const Timer = () => {
  return (
    <div className="timer-container">
      <h1 id="exercise-name">Exercise Name</h1>
      <div className="timer" id="timer">00:00</div>
      <div className="break-time" id="break-time" style={{ display: 'none' }}>Break: 00:00</div>
      <div className="details">
        <span id="set-rep-info">Set 1 / 3 | Rep 1 / 10</span>
      </div>
      <button id="pause-btn">Pause</button>
      <button id="continue-btn">Continue</button>
    </div>
  );
};

export default Timer;
