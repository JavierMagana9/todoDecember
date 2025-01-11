const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routers/taskRoutes');
const db = require('./config/db');
const app = express();
const port = 3000;

express.json();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});