document.getElementById('videoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('youtubeUrl').value;

    // Send the URL to Firebase (you'll set this up later)
    const response = await fetch('https://your-firebase-cloud-function-url', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.message || 'Download link is ready!';
});
