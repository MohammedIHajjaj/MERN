require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// express app
const app = express();

//middleware
app.use(express.json());
// we use this middleware because we want to use req.body because we want to send data in body in postman

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT);
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
