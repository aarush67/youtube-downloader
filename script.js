document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            // Create a hidden link to trigger the download
            const link = document.createElement('a');
            link.href = data.link; // This is the link returned by your backend
            link.download = ''; // Optional: You can set a default filename here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            resultDiv.innerHTML = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error('Error fetching the download link:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
