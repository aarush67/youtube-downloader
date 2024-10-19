document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultParagraph = document.getElementById('result');
    const warningParagraph = document.getElementById('warning');

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (response.ok && data.success) {
            const downloadLink = data.link;
            resultParagraph.innerHTML = `Streaming Link: <a href="${downloadLink}" target="_blank">Click here to stream</a>`;
            warningParagraph.classList.remove('hidden'); // Show the warning
            window.location.href = downloadLink; // Redirect to streaming URL
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultParagraph.textContent = `Error fetching the download link: ${error.message}`;
    }
});
