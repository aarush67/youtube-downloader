document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('downloadButton').addEventListener('click', async () => {
        const url = document.getElementById('videoUrl').value;

        if (!url) {
            document.getElementById('result').innerHTML = 'Please enter a valid YouTube URL.';
            return;
        }

        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(url)}`);

        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            // Provide a link that automatically downloads the file
            resultDiv.innerHTML = `Your video is being prepared for download. If it doesn't start automatically, <a href="${data.link}" download>click here</a>.`;
        } else {
            resultDiv.innerHTML = `Error: ${data.error}`;
        }
    });
});
