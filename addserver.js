// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

// Create an instance of Express
const app = express();
const PORT = 3010; // Set your desired port

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Endpoint to add a book
app.post('/addBook', (req, res) => {
    const { title, author, isbn } = req.body;

    // Validate input
    if (!title || !author || !isbn) {
        return res.status(400).send('All fields are required.');
    }

    const bookEntry = `${title},${author},${isbn}\n`;

    // Append the book entry to 'books.csv'
    fs.appendFile('books.csv', bookEntry, (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('Book added successfully');
    });
});

// Endpoint to get all books
app.get('/books', (req, res) => {
    fs.readFile('books.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data); // Send the contents of the CSV file
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});