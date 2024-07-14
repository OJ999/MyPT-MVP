import React, { useState, useEffect } from 'react';
import '../assets/css/Timer.css';

const Timer = ({ exercises, onStop }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(1);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (currentExerciseIndex < exercises.length) {
      const currentExercise = exercises[currentExerciseIndex];
      if (currentRep > currentExercise.reps) {
        if (currentSet < currentExercise.sets) {
          setCurrentSet(currentSet + 1);
          setCurrentRep(1);
        } else {
          if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSet(1);
            setCurrentRep(1);
          } else {
            setIsActive(false);
          }
        }
      }
    } else {
      setIsActive(false);
    }
  }, [time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setCurrentRep(1);
  };

  return (
    <div className="timer-container">
      <h1>{exercises[currentExerciseIndex]?.name || 'Workout Complete'}</h1>
      <div className="timer">{String(time).padStart(2, '0')}</div>
      {isActive && exercises[currentExerciseIndex] && (
        <div className="details">
          Set {currentSet} / {exercises[currentExerciseIndex].sets} | Rep {currentRep} / {exercises[currentExerciseIndex].reps}
        </div>
      )}
      <button className="timerbuttons" onClick={handleStart}>Start</button>
      <button className="timerbuttons" id="pause-btn" onClick={handlePause}>Pause</button>
      <button className="timerbuttons" id="reset-btn" onClick={handleReset}>Reset</button>
      <button className="timerbuttons" onClick={onStop}>Stop</button>
    </div>
  );
};

export default Timer;
