const express = require('express');
const router = express.Router();
const { taskValidator } = require('../middleware/taskValidator');
const { createTask, getTasks, updateTask, deleteAllTasks, deleteTaskById } = require('../controllers/taskControllers');

router.get('/', getTasks);
router.post('/',taskValidator, createTask)
router.put('/:id',taskValidator, updateTask)
router.delete('/delAllTasks', deleteAllTasks); 
router.delete('/delTask/:id', deleteTaskById); 

module.exports = router;