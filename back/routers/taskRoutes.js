/**
 * @file taskRoutes.js
 * @description This file contains the routes for task-related operations.
 * @requires express
 * @requires ../middleware/taskValidator
 * @requires ../controllers/taskControllers
 */

const express = require('express');
const router = express.Router();
const { taskValidator } = require('../middleware/taskValidator');
const { createTask, getTasks, updateTask, deleteAllTasks, deleteTaskById } = require('../controllers/taskControllers');

/**
 * Route to get all tasks.
 * @name get/
 * @function
 * @memberof module:routers/taskRoutes
 * @inner
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
router.get('/', getTasks);

/**
 * Route to create a new task.
 * @name post/
 * @function
 * @memberof module:routers/taskRoutes
 * @inner
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {function} taskValidator - Middleware to validate task data
 */
router.post('/', taskValidator, createTask);

/**
 * Route to update an existing task by ID.
 * @name put/:id
 * @function
 * @memberof module:routers/taskRoutes
 * @inner
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {function} taskValidator - Middleware to validate task data
 */
router.put('/:id', taskValidator, updateTask);

/**
 * Route to delete all tasks.
 * @name delete/delAllTasks
 * @function
 * @memberof module:routers/taskRoutes
 * @inner
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
router.delete('/delAllTasks', deleteAllTasks);

/**
 * Route to delete a task by ID.
 * @name delete/delTask/:id
 * @function
 * @memberof module:routers/taskRoutes
 * @inner
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
router.delete('/delTask/:id', deleteTaskById);

module.exports = router;