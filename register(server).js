const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to register a user
app.post('/register', (req, res) => {
    const { user, pass } = req.body; // Only use user and pass
    const regEntry = `${user},${pass}\n`;

    fs.appendFile('register.csv', regEntry, (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('Registered successfully');
    });
});

// Optional: Endpoint to fetch registered users
app.get('/register', (req, res) => {
    fs.readFile('register.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});

// Catch-all for 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});