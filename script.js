document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultParagraph = document.getElementById('result');

    // Clear previous result
    resultParagraph.textContent = "Processing your request...";

    try {
        // Make the request to your backend to get the download link
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (response.ok && data.success) {
            const downloadLink = data.link;

            // Create a temporary anchor element to trigger download
            const a = document.createElement('a');
            a.href = downloadLink;
            a.download = ''; // Set the download attribute, prompt the browser to download the video
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); // Clean up after download trigger

            resultParagraph.innerHTML = `Download initiated. If it doesn't start automatically, <a href="${downloadLink}" target="_blank">click here to download</a>.`;
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultParagraph.textContent = `Error fetching the download link: ${error.message}`;
    }
});
