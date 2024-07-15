/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/HomePage.css';
import axios from 'axios';
import bodyParser from 'body-parser';

const HomePage = () => {
  const [city, setCity] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [exercises, setExercises] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [showInputs, setShowInputs] = useState(true);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    history.push('/');
  };

  useEffect(() => {
    const openModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    };

    const closeModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    };

    const setupModal = (modalId, triggerClass) => {
      const triggers = document.querySelectorAll(triggerClass);
      triggers.forEach(trigger => {
        trigger.onclick = () => {
          const day = trigger.getAttribute('data-day');
          setCurrentDay(day);
          openModal(modalId);
        };
      });

      const modal = document.getElementById(modalId);
      if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
          closeBtn.onclick = () => closeModal(modalId);
        }

        window.onclick = (event) => {
          if (event.target === modal) {
            closeModal(modalId);
          }
        };
      }
    };

    setupModal('editModal', '.edit');
    addEditAndDeleteListeners();
  }, [editIndex, exercises]);

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  };

  const addExercise = () => {
    const exerciseName = document.getElementById('exerciseName').value;
    const exerciseReps = document.getElementById('exerciseReps').value;
    const exerciseTimePerRep = document.getElementById('exerciseTimePerRep').value;
    const exerciseSets = document.getElementById('exerciseSets').value;
    const exerciseBreak = document.getElementById('exerciseBreak').value;
    const breakAfterExercise = document.getElementById('breakAfterExercise').value;

    if (exerciseName && exerciseReps && exerciseTimePerRep && exerciseSets && exerciseBreak && breakAfterExercise) {
      const newExercise = {
        name: exerciseName,
        reps: exerciseReps,
        timePerRep: exerciseTimePerRep,
        sets: exerciseSets,
        break: exerciseBreak,
        breakAfter: breakAfterExercise
      };

      const dayExercises = exercises[currentDay] || [];
      if (editIndex !== null) {
        dayExercises[editIndex] = newExercise;
        setEditIndex(null);
      } else {
        dayExercises.push(newExercise);
      }

      setExercises({
        ...exercises,
        [currentDay]: dayExercises
      });

      // Clear inputs after adding
      clearInputs();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const addEditAndDeleteListeners = () => {
    const editButtons = document.querySelectorAll('.edit-exercise');
    const deleteButtons = document.querySelectorAll('.delete-exercise');

    editButtons.forEach((button, index) => {
      button.onclick = () => editExercise(index);
    });

    deleteButtons.forEach((button, index) => {
      button.onclick = () => deleteExercise(index);
    });
  };

  const editExercise = (index) => {
    const dayExercises = exercises[currentDay];
    const exercise = dayExercises[index];

    document.getElementById('exerciseName').value = exercise.name;
    document.getElementById('exerciseReps').value = exercise.reps;
    document.getElementById('exerciseTimePerRep').value = exercise.timePerRep;
    document.getElementById('exerciseSets').value = exercise.sets;
    document.getElementById('exerciseBreak').value = exercise.break;
    document.getElementById('breakAfterExercise').value = exercise.breakAfter;

    setEditIndex(index);
    setShowInputs(true); // Ensure input container is visible when editing
  };

  const deleteExercise = (index) => {
    const dayExercises = exercises[currentDay];
    dayExercises.splice(index, 1);
    setExercises({
      ...exercises,
      [currentDay]: dayExercises
    });
  };

  const toggleInputContainer = () => {
    setShowInputs(!showInputs);
  };

  const clearInputs = () => {
    document.getElementById('exerciseName').value = '';
    document.getElementById('exerciseReps').value = '';
    document.getElementById('exerciseTimePerRep').value = '';
    document.getElementById('exerciseSets').value = '';
    document.getElementById('exerciseBreak').value = '';
    document.getElementById('breakAfterExercise').value = '';
  };

  return (
    <body className='HomePagebody'>
    <div className="homepage-container">
      <section id="services" className="services">
        <div className="services">
          <div className="logo"> {city} My PT</div>
        </div>
      </section>
      <div className="container">
        <div className="row days">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <div key={day} className="col-lg-4 col-md-6 align-items-stretch day" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <h2>{day}</h2>
                <div className="button-container">
                  <button type="button" className="btn btn-outline-success btn-sm start">Start</button>
                  <button type="button" className="btn btn-outline-secondary btn-sm edit" data-day={day}>Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Schedule Modal */}
      <div id="editModal" className="modal">
        <div className="modal-content">
          
          <h2 id="modalDayTitle">{currentDay} <span className="close" onClick={() => closeModal('editModal')}>&times;</span></h2>
          <button id="toggleInputContainerBtn" className="btn-primary" onClick={toggleInputContainer}>Show/Hide Inputs</button>
          <div id="editModalContainer">
            {showInputs && (
              <div id="exerciseInputContainer">
                <div className="form-group">
                  <label htmlFor="exerciseName">Exercise Name</label>
                  <input type="text" id="exerciseName" placeholder="Exercise Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseReps">Number Of Reps</label>
                  <input type="number" id="exerciseReps" placeholder="Number Of Reps" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseTimePerRep">Seconds / Rep</label>
                  <input type="number" id="exerciseTimePerRep" placeholder="Seconds / Rep" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseSets">Number Of Sets</label>
                  <input type="number" id="exerciseSets" placeholder="Number Of Sets" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseBreak">Break Between</label>
                  <input type="number" id="exerciseBreak" placeholder="Break Between" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="breakAfterExercise">Break After Exercise</label>
                  <input type="number" id="breakAfterExercise" placeholder="Break After" min="0" />
                </div>
                <button id="addExerciseBtn" className="btn-primary" onClick={addExercise}>
                  {editIndex !== null ? 'Update Exercise' : 'Add Exercise'}
                </button>
              </div>
            )}
            <ul id="exerciseList" className="exercise-list">
              {(exercises[currentDay] || []).map((exercise, index) => (
                <li key={index}>
                  <span>{exercise.name} - {exercise.reps} Reps - {exercise.timePerRep} sec/Rep - {exercise.sets} Sets - {exercise.break}s Break - {exercise.breakAfter}s Break After</span>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm edit-exercise">Edit</button>
                    <button className="btn btn-outline-danger btn-sm delete-exercise">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            <button id="saveExercisesBtn" className="btn-primary" onClick={() => alert('Exercises saved successfully!')}>Save</button>
          </div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
    </body>
  );
};

export default HomePage;
