/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/Timer.css';
import axios from 'axios';

const Timer = () => {
  const location = useLocation();
  const { exercises, day } = location.state;
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [currentRep, setCurrentRep] = useState(1); // Start with the first repetition

  useEffect(() => {
    if (isActive && !isPaused) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clear interval on component unmount or when timer stops
      return () => clearInterval(interval);
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    if (time === 0 && isActive) {
      handleNextPhase();
    }
  }, [time, isActive]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setTime(exercises[currentExerciseIndex].timePerRep);
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
    setTime(0);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsBreak(false);
    setCurrentRep(1); // Reset current repetition count
  };

  const handleReset = () => {
    handleStop();
  };

  const handleNextPhase = () => {
    if (isBreak) {
      setIsBreak(false);
      setTime(exercises[currentExerciseIndex].timePerRep);
      setCurrentRep(1); // Reset repetition count for the next set
    } else {
      if (currentRep < exercises[currentExerciseIndex].reps) {
        setCurrentRep(currentRep + 1);
        setTime(exercises[currentExerciseIndex].timePerRep);
      } else if (currentSet < exercises[currentExerciseIndex].sets) {
        setCurrentSet(currentSet + 1);
        setIsBreak(true);
        setBreakTime(exercises[currentExerciseIndex].break);
        setTime(exercises[currentExerciseIndex].breakAfter); // Start counting break time
      } else if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsBreak(true);
        setBreakTime(exercises[currentExerciseIndex].breakAfter);
        setTime(exercises[currentExerciseIndex].breakAfter); // Start counting break time
        setCurrentRep(1); // Reset repetition count for the next exercise
      } else {
        setIsActive(false);
        alert("Workout Successful!");
      }
    }
  };

  return (
    <div className="Timerbody">
      <div className="timer-container">
        <h1>{day} Exercise Timer</h1>
        {exercises.length > 0 && exercises[currentExerciseIndex] && (
          <div className="exercise-details">
            <h2>{exercises[currentExerciseIndex].name}</h2>
            <p>Set {currentSet} of {exercises[currentExerciseIndex].sets}</p>
            <p>Reps: {currentRep} of {exercises[currentExerciseIndex].reps}</p>
            <p>Time per Rep: {exercises[currentExerciseIndex].timePerRep}s</p>
            <p>Break Between: {exercises[currentExerciseIndex].break}s</p>
            <p>Break After Exercise: {exercises[currentExerciseIndex].breakAfter}s</p>
          </div>
        )}
        <div className="timer">{String(time).padStart(2, '0')}</div>
        <button className="timerbuttons" onClick={handleStart}>Start</button>
        <button className="timerbuttons" id="pause-btn" onClick={handlePause}>Pause</button>
        <button className="timerbuttons" id="continue-btn" onClick={handleContinue}>Continue</button>
        <button className="timerbuttons" onClick={handleStop}>Stop</button>
        <button className="timerbuttons" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
