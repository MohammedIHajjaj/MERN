const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  //   const workouts = await Workout.find({reps: 3});
  //   const workouts = await Workout.find().sort({ createdAt: -1 });
  const workouts = await Workout.find();
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  } else {
    const workout = await Workout.findById(id);
    if (!workout) {
      res.status(400).json({ error: "No such workout" });
    } else {
      res.status(200).json(workout);
    }
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  } else {
    // const workout = await Workout.findByIdAndDelete(id);
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    } else {
      return res.status(200).json(workout);
    }
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  } else {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body, // we use spread here to get data in json of body not the json itself
      }
    );
    if (!workout) {
      return res.status(400).json({ error: "No such workout" });
    } else {
      return res.status(200).json(workout);
    }
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
