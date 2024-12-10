// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Endpoint to add a book
// app.post('/addBook', (req, res) => {
//     const { title, author, isbn } = req.body;
//     // const bookEntry = `${title},${author},${isbn}\n`;

//     fs.appendFile('books.csv', bookEntry, (err) => {
//         if (err) {
//             return res.status(500).send('Error writing to file');
//         }
//         res.send('Book added successfully');
//     });
// });

// // Endpoint to get all books
// app.get('/books', (req, res) => {
//     fs.readFile('books.csv', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error reading file');
//         }
//         res.send(data);
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });