document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    
    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(videoUrl)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('result').innerHTML = `Download Link: <a href="${data.link}" target="_blank">${data.link}</a>`;
        } else {
            document.getElementById('result').textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('result').textContent = `Error fetching the download link: ${err.message}`;
    }
});
