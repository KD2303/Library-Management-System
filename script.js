// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle adding books
    document.getElementById('addBookForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        const bookData = { title, author, isbn };

        // Send a POST request to add the book
        fetch('http://localhost:3010/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Show success message
            // Optionally, clear the form
            document.getElementById('addBookForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error adding the book. Please try again.');
        });
    });

    // Function to handle searching books
    document.getElementById('searchButton')?.addEventListener('click', function() {
        const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
        const results = document.getElementById('results');
        results.innerHTML = ''; // Clear previous results

        // Fetch the list of books
        fetch('http://localhost:3000/books')
            .then(response => response.text())
            .then(data => {
                const books = data.split('\n').slice(1); // Skip header
                books.forEach(book => {
                    const [title, author, isbn] = book.split(',');
                    if (title.toLowerCase().includes(searchTerm) || author.toLowerCase().includes(searchTerm)) {
                        const li = document.createElement('li');
                        li.textContent = `Title: ${title}, Author: ${author}, ISBN: ${isbn}`;
                        results.appendChild(li);
                    }
                });
                // If no results found, show a message
                if (results.innerHTML === '') {
                    results.innerHTML = '<li>No results found.</li>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error fetching the books. Please try again.');
            });
    });
});