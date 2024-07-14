/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../assets/css/Timer.css';

const Timer = ({ exercises = {}, currentDay }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

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

  useEffect(() => {
    if (time > 0 && exercises[currentDay]) {
      const exercise = exercises[currentDay][currentExerciseIndex];
      const totalExerciseTime = exercise.reps * exercise.timePerRep;

      if (time >= totalExerciseTime) {
        if (currentSet < exercise.sets) {
          setCurrentSet(currentSet + 1);
          setTime(0);
        } else if (currentExerciseIndex < exercises[currentDay].length - 1) {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
          setCurrentSet(1);
          setTime(0);
        } else {
          handleReset();
        }
      }
    }
  }, [time, currentDay, exercises, currentExerciseIndex, currentSet]);

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
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
  };

  return (
    <div className="timer-container">
      <h1>Exercise Timer</h1>
      {exercises[currentDay] && exercises[currentDay][currentExerciseIndex] && (
        <div>
          <h2>{exercises[currentDay][currentExerciseIndex].name}</h2>
          <p>Set {currentSet} of {exercises[currentDay][currentExerciseIndex].sets}</p>
          <p>Reps: {exercises[currentDay][currentExerciseIndex].reps}</p>
          <p>Time per Rep: {exercises[currentDay][currentExerciseIndex].timePerRep}s</p>
        </div>
      )}
      <div className="timer">{String(time).padStart(2, '0')}</div>
      <button className='timerbuttons' onClick={handleStart}>Start</button>
      <button className='timerbuttons' id="pause-btn" onClick={handlePause}>Pause</button>
      <button className='timerbuttons' id="continue-btn" onClick={handleContinue}>Continue</button>
      <button className='timerbuttons' onClick={handleStop}>Stop</button>
      <button className='timerbuttons' onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
