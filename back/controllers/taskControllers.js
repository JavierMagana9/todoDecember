/**
 * @fileoverview Controller functions for task management.
 */

const Task = require('../models/task');
const mongoose = require('mongoose');

/**
 * Get all tasks.
 * @async
 * @function getTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error getting a task", error });
    }
};

/**
 * Create a new task.
 * @async
 * @function createTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating a task", error });
    }
};

/**
 * Update an existing task by ID.
 * @async
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

/**
 * Delete all tasks.
 * @async
 * @function deleteAllTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteAllTasks = async (req, res) => {
    try {
        const count = await Task.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "No tasks to delete" });
        }

        await Task.deleteMany();
        res.status(200).json({ message: "All tasks deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting all tasks", error });
    }
};

/**
 * Delete a task by ID.
 * @async
 * @function deleteTaskById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "not valid ID" });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted", _id: id });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteAllTasks, deleteTaskById };
