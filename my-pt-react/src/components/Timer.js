import React, { useState, useEffect } from 'react';
import '../assets/css/Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (isPaused) {
      clearInterval(interval);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="timer-container">
      <h1>Exercise Name</h1>
      <div className="timer">{String(time).padStart(2, '0')}</div>
      <div className="details">Set 1 / 3 | Rep 1 / 10</div>
      <button className='timerbuttons' onClick={handleStart}>Start</button>
      <button className='timerbuttons' id="pause-btn" onClick={handlePause}>Pause</button>
      <button className='timerbuttons' id="continue-btn" onClick={handleContinue}>Continue</button>
      <button className='timerbuttons' onClick={handleStop}>Stop</button>
      <button className='timerbuttons' onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
