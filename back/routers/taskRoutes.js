const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteAllTasks, deleteTaskById } = require('../controllers/taskControllers');

router.get('/', getTasks);
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/delAllTasks', deleteAllTasks); 
router.delete('/delTask/:id', deleteTaskById); 

module.exports = router;