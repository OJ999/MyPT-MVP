import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getExercises, addExercise, updateExercise, deleteExercise } from '../services/apiService';
import '../assets/css/HomePage.css';

function HomePage() {
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
    const fetchExercises = async () => {
      try {
        const fetchedExercises = await getExercises();
        const exercisesByDay = fetchedExercises.reduce((acc, exercise) => {
          const { day } = exercise;
          if (!acc[day]) acc[day] = [];
          acc[day].push(exercise);
          return acc;
        }, {});
        setExercises(exercisesByDay);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
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

  const addExerciseHandler = async () => {
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
        breakAfter: breakAfterExercise,
        day: currentDay
      };

      const dayExercises = exercises[currentDay] || [];
      if (editIndex !== null) {
        const updatedExercise = await updateExercise(dayExercises[editIndex]._id, newExercise);
        dayExercises[editIndex] = updatedExercise;
        setEditIndex(null);
      } else {
        const addedExercise = await addExercise(newExercise);
        dayExercises.push(addedExercise);
      }

      setExercises(prevExercises => ({
        ...prevExercises,
        [currentDay]: dayExercises
      }));
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
      button.onclick = () => deleteExerciseHandler(index);
    });
  };

  const editExercise = (index) => {
    const exercise = exercises[currentDay][index];

    document.getElementById('exerciseName').value = exercise.name;
    document.getElementById('exerciseReps').value = exercise.reps;
    document.getElementById('exerciseTimePerRep').value = exercise.timePerRep;
    document.getElementById('exerciseSets').value = exercise.sets;
    document.getElementById('exerciseBreak').value = exercise.break;
    document.getElementById('breakAfterExercise').value = exercise.breakAfter;

    setEditIndex(index);
    setShowInputs(true); // Ensure input container is visible when editing
  };

  const deleteExerciseHandler = async (index) => {
    const exerciseId = exercises[currentDay][index]._id;
    try {
      await deleteExercise(exerciseId);
      const updatedExercises = exercises[currentDay].filter((_, i) => i !== index);
      setExercises(prevExercises => ({
        ...prevExercises,
        [currentDay]: updatedExercises
      }));
    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }
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

  const startTraining = (day) => {
    history.push({
      pathname: '/timer',
      state: { exercises: exercises[day], day }
    });
  };

  return (
    <div className="homepage-container">
      <section id="services" className="services">
        <div className="services">
          <div className="logo"> {city} My PT</div>
        </div>
      </section>
      <div className='HomePagebody'>
        <div className="container">
          <div className="row days">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="col-lg-4 col-md-6 align-items-stretch day" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-box">
                  <h2>{day}</h2>
                  <div className="button-container">
                    <button type="button" className="btn btn-outline-success btn-sm start" onClick={() => startTraining(day)}>Start</button>
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
                  <button id="addExerciseBtn" className="btn-primary" onClick={addExerciseHandler}>
                    {editIndex !== null ? 'Update Exercise' : 'Add Exercise'}
                  </button>
                </div>
              )}
              <ul id="exerciseList" className="exercise-list">
                {(exercises[currentDay] || []).map((exercise, index) => (
                  <li key={index}>
                    <span>{exercise.name} - {exercise.reps} Reps - {exercise.timePerRep} sec/Rep - {exercise.sets} Sets - {exercise.break}s Break - {exercise.breakAfter}s Break After</span>
                    <div>
                      <button className="btn btn-outline-secondary btn-sm edit-exercise" onClick={() => editExercise(index)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm delete-exercise" onClick={() => deleteExerciseHandler(index)}>Delete</button>
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
    </div>
  );
}

export default HomePage;
