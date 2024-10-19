document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;
    const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev//download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    if (data.success) {
        // Create a hidden link and trigger download
        const link = document.createElement('a');
        link.href = data.link; // Ensure this points to your backend's download route
        link.download = 'video.mp4'; // Specify the default filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        resultDiv.innerHTML = `Error: ${data.error}`;
    }
});
