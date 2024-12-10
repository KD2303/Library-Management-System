document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const cnfpass = document.getElementById('cnf').value.trim();

        // Validate input
        if (!user || !pass || !cnfpass) {
            alert("Please fill in all fields.");
            return;
        }
        
        // Check if passwords match
        if (pass !== cnfpass) {
            alert("Passwords do not match.");
            return;
        }

        const regData = { user, pass };

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            alert(data);
            // Optionally, clear the form
            document.getElementById('registerForm').reset();
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem with registration. Please check if the server is running and try again.');
        }
    });
});