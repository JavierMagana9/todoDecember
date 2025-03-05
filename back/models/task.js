/**
 * @file task.js
 * @description Mongoose model for tasks in the todoDecember application.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Task
 * @property {string} title - The title of the task.
 * @property {string} [description] - The description of the task.
 * @property {Date} date - The date the task was created. Defaults to the current date.
 * @property {boolean} done - The completion status of the task. Defaults to false.
 */

/**
 * Mongoose schema for the Task model.
 * @type {mongoose.Schema<Task>}
 */
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
});

/**
 * Mongoose model for tasks.
 * @type {mongoose.Model<Task>}
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
