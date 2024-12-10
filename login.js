document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.querySelector('input[placeholder="Username"]').value.trim();
        const password = document.querySelector('input[placeholder="Password"]').value.trim();

        // Validate input
        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const loginData = { user: username, pass: password };

        try {
            const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            alert(data); // Show success message

            // Redirect to addbook.html on successful login
            window.location.href = "addbook.html";
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem with login. Please check your username and password.');
        }
    });
});