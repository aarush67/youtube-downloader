document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;
    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            // Create a temporary link element for downloading
            const a = document.createElement('a');
            a.href = data.link; // Use the link provided by the backend
            a.download = ''; // Set to an empty string to use the filename from the URL
            document.body.appendChild(a);
            a.click(); // Programmatically click the link to trigger download
            document.body.removeChild(a); // Clean up
        } else {
            resultDiv.innerHTML = `Error: ${data.error}`;
        }
    } catch (err) {
        console.error('Error fetching the download link:', err);
        document.getElementById('result').innerHTML = `Error fetching the download link: ${err.message}`;
    }
});
