document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    fetch('books.csv')
        .then(response => response.text())
        .then(data => {
            const books = parseCSV(data);
            const results = books.filter(book => 
                book.name.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm)
            );
            displayResults(results);
        });
});

function parseCSV(data) {
    const lines = data.split('\n');
    const books = [];
    for (let i = 1; i < lines.length; i++) {
        const [name, author] = lines[i].split(',');
        if (name && author) {
            books.push({ name, author });
        }
    }
    return books;
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }
    results.forEach(book => {
        const p = document.createElement('p');
        p.textContent = `Book: ${book.name}, Author: ${book.author}`;
        resultsDiv.appendChild(p);
    });
}