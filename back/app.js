/**
 * @fileoverview Main application file for the todoDecember backend.
 * Configures and starts the Express server.
 * 
 * @requires dotenv - Loads environment variables from a .env file.
 * @requires express - Fast, unopinionated, minimalist web framework for Node.js.
 * @requires mongoose - MongoDB object modeling tool designed to work in an asynchronous environment.
 * @requires ./routers/taskRoutes - Task routes for the application.
 * @requires ./config/db - Database configuration.
 */

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routers/taskRoutes');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * GET /
 * Test route to check if the server is running.
 * 
 * @name GetRoot
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/tasks", taskRoutes);

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
