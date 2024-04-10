const express = require('express');
const app = express();
const fs = require('fs');

// Serve static files from the HabitForge directory
app.use(express.static('HabitForge'));

// Middleware to parse JSON bodies
app.use(express.json());

// Test route to confirm server is running
app.get('/', (req, res) => {
    res.send('Hello World! The server is up and running.');
});

// Define a route for reading your JSON data
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the data file');
            return;
        }
        res.send(data);
    });
});

// Define a route for writing JSON data
app.post('/data', (req, res) => {
    const data = JSON.stringify(req.body, null, 2); // Pretty print the JSON
    fs.writeFile('data.json', data, 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error writing the data file');
            return;
        }
        res.send('Data saved successfully');
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
