const express = require("express");
const router = express.Router();
const workoutFunctions = require("../controllers/workoutController");

// GET all workouts
router.get("/", workoutFunctions.getWorkouts);

// GET single workout
router.get("/:id", workoutFunctions.getWorkout);

//POST a new workout
router.post("/", workoutFunctions.createWorkout);

//DELETE a workout
router.delete("/:id", workoutFunctions.deleteWorkout);

//UPDATE a workout
router.patch("/:id", workoutFunctions.updateWorkout);

module.exports = router;
