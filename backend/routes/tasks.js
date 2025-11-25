import express from "express";
import Task from "../models/Task.js";
import Session from "../models/Session.js";

const router = express.Router();

// Root route
router.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      tasks: "/api/tasks",
      sessions: "/api/sessions",
    },
  });
});

// TODO: Add your Task routes here
// POST /api/tasks
router.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tasks/:id
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/tasks/:id
router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // Which task to update
      req.body, // New data
      {
        new: true, // Return updated version
        runValidators: true, // Check schema rules
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      book: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO: Add your Session routes here
// POST /api/sessions
router.post("/sessions", async (req, res) => {
  try {
    const newSession = new Session(req.body);

    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;