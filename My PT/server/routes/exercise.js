const express = require('express');
const router = express.Router();
const DailyExercise = require('../models/DailyExercise');

// Add a new exercise
router.post('/exercises', async (req, res) => {
  const { name, reps, timePerRep, sets, break: breakTime, breakAfter, day } = req.body;

  if (!name || !reps || !timePerRep || !sets || !breakTime || !breakAfter || !day) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newExercise = new DailyExercise({
      name,
      reps,
      timePerRep,
      sets,
      break: breakTime,
      breakAfter,
      day
    });

    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    console.error('Error saving exercise:', err);
    res.status(500).send('Error saving exercise');
  }
});

// Get all exercises
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await DailyExercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    console.error('Error fetching exercises:', err);
    res.status(500).send('Error fetching exercises');
  }
});

// Update an exercise
router.put('/exercises/:id', async (req, res) => {
  const { id } = req.params;
  const { name, reps, timePerRep, sets, break: breakTime, breakAfter, day } = req.body;

  if (!name || !reps || !timePerRep || !sets || !breakTime || !breakAfter || !day) {
    return res.status(400).send('All fields are required');
  }

  try {
    const updatedExercise = await DailyExercise.findByIdAndUpdate(
      id,
      { name, reps, timePerRep, sets, break: breakTime, breakAfter, day },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (err) {
    console.error('Error updating exercise:', err);
    res.status(500).send('Error updating exercise');
  }
});

// Delete an exercise
router.delete('/exercises/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await DailyExercise.findByIdAndDelete(id);
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error('Error deleting exercise:', err);
    res.status(500).send('Error deleting exercise');
  }
});

module.exports = router;
