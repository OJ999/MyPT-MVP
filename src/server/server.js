const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = {};
let exercises = {};

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users[username] = { username, password, id: uuidv4(), category: 'PersonalTrainer' }; // Added category for example
  res.status(201).json({ message: 'User registered successfully', user: users[username] });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users[username];

  if (user && user.password === password) {
    return res.status(200).json(user);
  }

  res.status(400).json({ message: 'Invalid username or password' });
});

// Get exercises for a day endpoint
app.get('/api/exercises', (req, res) => {
  const { username, day } = req.query;

  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userExercises = exercises[username]?.[day] || [];
  res.status(200).json({ exercises: userExercises });
});

// Add exercise endpoint
app.post('/api/exercises', (req, res) => {
  const { username, day, exercise } = req.body;

  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!exercises[username]) {
    exercises[username] = {};
  }

  if (!exercises[username][day]) {
    exercises[username][day] = [];
  }

  exercises[username][day].push(exercise);
  res.status(201).json({ message: 'Exercise added successfully' });
});

// Logout endpoint (just for example purposes)
app.post('/api/logout', (req, res) => {
  // Here you would handle any logout logic needed
  res.status(200).json({ message: 'User logged out successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
