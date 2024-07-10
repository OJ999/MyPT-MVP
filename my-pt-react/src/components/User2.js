/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import GLightbox from 'glightbox'; // Correctly importing GLightbox
import '../assets/css/Users.css';

const User2 = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [exercises, setExercises] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [showInputs, setShowInputs] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Name',
    bio: 'Bio',
    birthday: 'Date',
    email: 'Email',
    phone: 'Phone Number',
    city: 'Location',
    profilePicture: 'path_to_profile_picture.jpg'
  });
  const [friendRequests, setFriendRequests] = useState([
    { name: "MyPT", profilePic: "path_to_profile_picture.jpg" }
  ]);

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

    setupModal('schedule-modal', '.start-link');
    setupModal('editModal', '.edit');
    setupModal('profile-modal', '#profile-link');
    setupModal('edit-profile-popup', '.edit-profile-button');
    setupModal('friends-modal', '#friends-link');
    setupModal('conversation-modal', '#conversation-friend-name');
    setupModal('add-friend-modal', '#add-friend-btn');
    setupModal('clients-modal', '#clients-link');
    setupModal('client-schedule-modal', '.edit-client-schedule');
    setupModal('add-client-modal', '#add-client-btn');

    addEditAndDeleteListeners();

    // Initialize GLightbox
    GLightbox({
      selector: '.portfolio-lightbox'
    });
    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: document.getElementById('name').value,
      bio: document.getElementById('bio').value,
      birthday: document.getElementById('birthday').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      city: document.getElementById('city').value,
      profilePicture: document.getElementById('profile_picture').files[0] ? URL.createObjectURL(document.getElementById('profile_picture').files[0]) : profile.profilePicture
    };
    setProfile(updatedProfile);
    closeModal('edit-profile-popup');
  };

  const acceptFriendRequest = (index) => {
    const request = friendRequests[index];
    setFriendRequests(friendRequests.filter((_, i) => i !== index));
    // Handle adding friend logic here
  };

  const declineFriendRequest = (index) => {
    setFriendRequests(friendRequests.filter((_, i) => i !== index));
  };

  return (
    <div className="user2-container">
      <section id="services" className="services">
        <div className="services">
          <div className="logo">My PT</div>
        </div>
        <div className="Buttons" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex align-items-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <a href="#add-friend-modal" id="friends-link">
                    <i className="bi bi-person-fill-add"></i>
                    <h4>Friends</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex align-items-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <a href="#profile-modal" id="profile-link">
                    <i className="bi bi-person-circle"></i>
                    <h4>Profile</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex align-items-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <a href="#schedule-modal" className="start-link">
                    <i className="bi bi-speedometer"></i>
                    <h4>Schedule</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex align-items-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <a href="#clients-modal" id="clients-link">
                    <i className="bi bi-person-lines-fill"></i>
                    <h4>Clients</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      <div id="schedule-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={() => closeModal('schedule-modal')}>&times;</span>
            <div className="section-title">
              <h2>Schedule</h2>
            </div>
          </div>
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
        </div>
      </div>

      {/* Edit Schedule Modal */}
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('editModal')}>&times;</span>
          <h2 id="modalDayTitle">{currentDay}</h2>
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
                  <label htmlFor="exerciseTimePerRep">Seconds per Rep</label>
                  <input type="number" id="exerciseTimePerRep" placeholder="Seconds per Rep" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseSets">Number Of Sets</label>
                  <input type="number" id="exerciseSets" placeholder="Number Of Sets" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="exerciseBreak">Break Time</label>
                  <input type="number" id="exerciseBreak" placeholder="Break Time" min="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="breakAfterExercise">Break After Exercise</label>
                  <input type="number" id="breakAfterExercise" placeholder="Break After Exercise" min="0" />
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

      {/* Profile Modal */}
      <div id="profile-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="section-title">
              <h2>Profile</h2>
            </div>
            <span className="close" onClick={() => closeModal('profile-modal')}>&times;</span>
          </div>
          <div className="profile-body">
            <div className="profile-picture">
              <img src={profile.profilePicture} alt="Profile Picture" />
            </div>
            <div className="profile-details">
              <h2 id="userFullName">{profile.name}</h2>
              <p className="fst-italic">{profile.bio}</p>
              <ul>
                <li><strong>Birthday:</strong> {profile.birthday}</li>
                <li><strong>Email:</strong> {profile.email}</li>
                <li><strong>Phone:</strong> {profile.phone}</li>
                <li><strong>City:</strong> {profile.city}</li>
              </ul>
              <button className="edit-profile-button" onClick={() => openModal('edit-profile-popup')}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Popup */}
      <div id="edit-profile-popup" className="popup">
        <div className="popup-content">
          <span className="close" onClick={() => closeModal('edit-profile-popup')}>&times;</span>
          <h2>Edit Profile</h2>
          <form id="edit-profile-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" defaultValue={profile.name} />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <input type="text" id="bio" name="bio" defaultValue={profile.bio} />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday:</label>
              <input type="text" id="birthday" name="birthday" defaultValue={profile.birthday} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" defaultValue={profile.email} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" defaultValue={profile.phone} />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" defaultValue={profile.city} />
            </div>
            <div className="form-group">
              <label htmlFor="profile_picture">Profile Picture:</label>
              <input type="file" name="profile_picture" id="profile_picture" />
            </div>
            <button type="submit" className="save-changes-button">Save Changes</button>
          </form>
        </div>
      </div>

      {/* Friends Modal */}
      <div id="friends-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="section-title">
              <h2>Friends</h2>
            </div>
            <span className="close" onClick={() => closeModal('friends-modal')}>&times;</span>
          </div>
          <div className="search-container friends-search-container">
            <div className="search-wrapper">
              <div className="input-group">
                <input type="text" id="search-friends" className="form-control" placeholder="Search Friends" />
                <button id="search-friends-btn" className="btn btn-secondary search-friends-button">
                  <i className="bi bi-search"></i>
                </button>
                <button id="add-friend-btn" className="btn btn-primary add-friend-button">
                  <i className="bi bi-person-plus">Add</i>
                </button>
              </div>
            </div>
          </div>
          <div className="friends-navigation">
            <button className="nav-button" id="friends-list-btn">Friends</button>
            <button className="nav-button" id="friend-requests-btn">Friend Requests</button>
          </div>
          <div id="friends-list-container">
            {/* Friends List */}
          </div>
          <div id="friend-requests-container" style={{ display: 'none' }}>
            {friendRequests.map((request, index) => (
              <div key={index} className="friend-request-item">
                <img src={request.profilePic} alt="Profile Picture" className="profile-pic" />
                <span className="friend-name">{request.name}</span>
                <button className="accept-btn" onClick={() => acceptFriendRequest(index)}>Accept</button>
                <button className="decline-btn" onClick={() => declineFriendRequest(index)}>Decline</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation Modal */}
      <div id="conversation-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2><span id="conversation-friend-name"></span></h2>
            <span className="close" onClick={() => closeModal('conversation-modal')}>&times;</span>
          </div>
          <div className="conversation-body">
            <div id="conversation-messages" className="conversation-messages">
              {/* Messages will be dynamically loaded here */}
            </div>
          </div>
          <div className="conversation-footer">
            <input type="text" id="message-input" placeholder="Type a message" />
            <button id="send-message-btn">Send</button>
          </div>
        </div>
      </div>

      {/* Add Friend Modal */}
      <div id="add-friend-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add Friends</h2>
            <span className="close" onClick={() => closeModal('add-friend-modal')}>&times;</span>
          </div>
          <div className="search-container">
            <div className="search-wrapper">
              <input type="text" id="search-users" placeholder="Search Users" />
              <button id="search-friends-btn" className="btn btn-secondary search-friends-button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div id="users-list-container">
            {/* List of users to add as friends */}
          </div>
        </div>
      </div>

      {/* Clients Modal */}
      <div id="clients-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="section-title">
              <h2>Clients</h2>
            </div>
            <span className="close" onClick={() => closeModal('clients-modal')}>&times;</span>
          </div>
          <div className="search-container clients-search-container">
            <div className="search-wrapper">
              <div className="input-group">
                <input type="text" id="search-clients" className="form-control" placeholder="Search Clients" />
                <button id="search-clients-btn" className="btn btn-secondary search-clients-button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="clients-navigation">
            <button className="nav-button" id="clients-list-btn">Clients</button>
          </div>
          <div id="clients-list-container">
            {/* Clients List */}
          </div>
        </div>
      </div>

      {/* Client Schedule Modal */}
      <div id="client-schedule-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={() => closeModal('client-schedule-modal')}>&times;</span>
            <div className="section-title">
              <h2>Schedule</h2>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                  <div className="icon-box">
                    <h2>{day}</h2>
                    <div className="button-container">
                      <button type="button" className="btn btn-outline-secondary btn-sm" data-day={day}>Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <div id="add-client-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="section-title">
              <h2>Select Friend to Add as Client</h2>
            </div>
            <span className="close" onClick={() => closeModal('add-client-modal')}>&times;</span>
          </div>
          <div className="search-container">
            <div className="search-wrapper">
              <div className="input-group">
                <input type="text" id="search-friends-for-client" className="form-control" placeholder="Search Friends" />
                <button id="search-friends-for-client-btn" className="btn btn-secondary search-friends-button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div id="friends-for-client-list-container">
            {/* Friends List for Adding as Client */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User2;
