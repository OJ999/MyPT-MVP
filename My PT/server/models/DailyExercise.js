const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DailyExerciseSchema = new Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  timePerRep: { type: Number, required: true },
  sets: { type: Number, required: true },
  break: { type: Number, required: true },
  breakAfter: { type: Number, required: true },
  day: { type: String, required: true }
});

module.exports = mongoose.model('DailyExercise', DailyExerciseSchema);
