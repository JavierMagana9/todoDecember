// src/services/api/endpoints.js
export const ENDPOINTS = {
    TODOS: '/tasks',
    TODO: (id) => `/tasks/${id}`,
    DELETE_ALL: '/tasks/delAllTasks',  // This is specific for deleting all tasks
    DELETE_ONE: (id) => `/tasks/delTask/${id}`
    // I would add other endpoints here, like:
    // USERS: '/users',
    // USER: (id) => `/users/${id}`
  };