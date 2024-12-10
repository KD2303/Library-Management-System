const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3003; // Ensure this matches your client-side requests

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to handle user login
app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    fs.readFile('register.csv', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send({ message: 'Error reading file' });
        }

        const users = data.split('\n').filter(line => line); // Filter out empty lines
        for (let line of users) {
            const [registeredUser, registeredPass] = line.split(',');
            if (registeredUser === user && registeredPass === pass) {
                return res.send({ message: 'Login successful' }); // Send success response
            }
        }

        res.status(401).send({ message: 'Invalid username or password' }); // Send error response if not found
    });
});

// Catch-all for 404 errors
app.use((req, res) => {
    res.status(404).send({ message: '404 Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});