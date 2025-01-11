const Task = require('../models/task');

const createTask = async (req, res) => {

    try {
        const newTask = new Task(req.body);
        await newTask.save();
        
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }

};

module.exports = { createTask };