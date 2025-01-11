const Task = require('../models/task');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error getting a task", error });
    }
};

const createTask = async (req, res) => {

    try {
        const newTask = new Task(req.body);
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating a task", error });
    }

};

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

const deleteAllTasks = async (req, res) => {

    try {
        await Task.deleteMany();
        res.status(200).json({ message: "All tasks deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting all tasks", error });
    }

};

const deleteTaskById = async (req, res) => {
    
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "not valid ID" });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }

}

module.exports = { createTask, getTasks, updateTask, deleteAllTasks, deleteTaskById };