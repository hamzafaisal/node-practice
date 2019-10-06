// IMPORT MODULES
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();
const port = process.env.PORT || 3000;

// Register UP EXPRESS APP
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// SETTING ROUTES

// SETTING UP SERVER
app.listen(port, () => console.log("http://localhost:3000/"));
