require("dotenv").config();

const verifyToken = require("./middleware.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, signup, editProfile } = require("./controllers/authController");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Routes
app.post("/signup", signup);
app.post("/login", login);
app.put("/edit-profile", verifyToken, editProfile);

app.listen(3001, () => {
  console.log("server is running");
});
