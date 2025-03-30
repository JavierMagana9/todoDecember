// src/services/api/endpoints.js
export const ENDPOINTS = {
    TODOS: '/todos',
    TODO: (id) => `/todos/${id}`,
    // I would add other endpoints here, like:
    // USERS: '/users',
    // USER: (id) => `/users/${id}`
  };