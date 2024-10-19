document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultParagraph = document.getElementById('result');

    resultParagraph.textContent = "Processing your request...";

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (response.ok && data.success) {
            const downloadLink = data.link;

            // Create a hidden <a> element to trigger a download
            const a = document.createElement('a');
            a.href = downloadLink;
            a.download = ''; // Use the browser's default file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            resultParagraph.innerHTML = `Download initiated. If it doesn't start, <a href="${downloadLink}" target="_blank">click here to download</a>.`;
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultParagraph.textContent = `Error fetching the download link: ${error.message}`;
    }
});
