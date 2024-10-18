document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;
    const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    if (data.success) {
        resultDiv.innerHTML = `Download Link: <a href="${data.link}" target="_blank">Click Here</a>`;
    } else {
        resultDiv.innerHTML = `Error: ${data.error}`;
    }
});
