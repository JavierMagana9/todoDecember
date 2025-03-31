// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, deleteAllTasks, toggleTaskCompletion } from '../services/todoService';
import { formatApiError } from '../services/api/helpers';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await getTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, response.data]);
      return response.data;
    } catch (err) {
      setError(formatApiError(err));
      throw err;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const response = await updateTask(id, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => task._id === id ? response.data : task)
      );
      return response.data;
    } catch (err) {
      setError(formatApiError(err));
      throw err;
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      setError(formatApiError(err));
      throw err;
    }
  };

  const clearAllTasks = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
    } catch (err) {
      setError(formatApiError(err));
      throw err;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;
      
      const response = await toggleTaskCompletion(id, task);
      setTasks(prevTasks => 
        prevTasks.map(t => t._id === id ? response.data : t)
      );
      return response.data;
    } catch (err) {
      setError(formatApiError(err));
      throw err;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    clearAllTasks,
    toggleComplete
  };
};

export default useTasks;