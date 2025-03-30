// src/services/api/helpers.js
const API_URL = 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
  // Set up default headers for all requests
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };

  // Merge default headers with any custom headers
  const config = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options
  };

  // Convert any object body to JSON string (fetch doesn't do this automatically)
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    // Make the actual fetch request
    const response = await fetch(`${REACT_APP_API_URL}${endpoint}`, config);
    
    // Parse the JSON response (this happens regardless of success/error)
    const data = await response.json();
    
    // Check if the response was successful (status 200-299)
    if (!response.ok) {
      // If not successful, throw a structured error object
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        data
      };
    }
    
    // If successful, return the parsed data
    return data;
  } catch (error) {
    // Log the error and re-throw it for handling upstream
    console.error('API request failed:', error);
    throw error;
  }
};

// Also in src/services/api/helpers.js

// GET requests (for retrieving data)
export const get = (endpoint, options = {}) => 
    apiRequest(endpoint, { method: 'GET', ...options });
  
  // POST requests (for creating data)
  export const post = (endpoint, body, options = {}) => 
    apiRequest(endpoint, { method: 'POST', body, ...options });
  
  // PUT requests (for updating data)
  export const put = (endpoint, body, options = {}) => 
    apiRequest(endpoint, { method: 'PUT', body, ...options });
  
  // DELETE requests (for removing data)
  export const del = (endpoint, options = {}) => 
    apiRequest(endpoint, { method: 'DELETE', ...options });