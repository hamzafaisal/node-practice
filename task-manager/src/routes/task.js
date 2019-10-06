const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/auth");

// GET ALL TASKS
router.get("/tasks", auth, async (req, res) => {
  let match;
  if (req.query.completed) {
    match = req.query;
  } else {
    match = null;
  }
  try {
    let task = await Task.find({
      owner: req.user._id,
      ...match
    })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ createdAt: req.query.sort == "desc" ? -1 : 1 });

    // let task = await req.user.populate("tasks").execPopulate();
    if (task) {
      res.send(task);
    } else {
      res.status(404).send("no task found!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET SINGLE Task
router.get("/task/:id", auth, async (req, res) => {
  let _id = req.params.id;
  try {
    let task = await Task.findOne({ _id, owner: req.user._id });
    if (task) {
      res.send(task);
    } else {
      return res.status(404).send("Task not found!");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// UPDATE TASKS
router.patch("/task/:id", auth, async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (task) {
      let updates = Object.keys(req.body);
      updates.forEach(element => {
        task[element] = req.body[element];
      });

      await task.save();
      res.send(task);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    res.status(404);
  }
});

// DELETE Task
router.delete("/task/:id", auth, async (req, res) => {
  try {
    let task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (task) {
      res.send(task);
    } else {
      return res.status(404).send("not found!");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// ADD TASK
router.post("/task", auth, async (req, res) => {
  const newTask = new Task({ ...req.body, owner: req.user._id });

  try {
    let task = await newTask.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
