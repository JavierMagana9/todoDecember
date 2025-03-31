// src/services/taskService.js
import { get, post, put, del } from './api/helpers';
import { ENDPOINTS } from './api/endpoints';

export const getTasks = async () => {
 try {
   const data = await get(ENDPOINTS.TODOS);
   return { data };
 } catch (error) {
   console.error('Failed to fetch tasks:', error);
   throw error;
 }
};

export const createTask = async (task) => {
 try {
   const data = await post(ENDPOINTS.TODOS, task);
   return { data };
 } catch (error) {
   console.error('Failed to create task:', error);
   throw error;
 }
};

export const updateTask = async (id, updatedTask) => {
 try {
   const data = await put(ENDPOINTS.TODO(id), updatedTask);
   return { data };
 } catch (error) {
   console.error('Failed to update task:', error);
   throw error;
 }
};

export const deleteTask = async (id) => {
 try {
   const data = await del(ENDPOINTS.DELETE_ONE(id));
   return { data };
 } catch (error) {
   console.error('Failed to delete task:', error);
   throw error;
 }
};

export const deleteAllTasks = async () => {
 try {
   const data = await del(ENDPOINTS.DELETE_ALL);
   return { data };
 } catch (error) {
   console.error('Failed to delete all tasks:', error);
   throw error;
 }
};


export const toggleTaskCompletion = async (id, task) => {
  try {
    
    const updateData = {
      title: task.title,
      done: !task.done
    };
    
    
    if (task.description) {
      updateData.description = task.description;
    }
    
    console.log("Update data:", updateData);
    const data = await put(ENDPOINTS.TODO(id), updateData);
    return { data };
  } catch (error) {
    console.error('Failed to toggle task completion:', error);
    throw error;
  }
};