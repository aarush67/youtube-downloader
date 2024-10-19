document.getElementById('getFormatsBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const loadingIndicator = document.getElementById('loadingIndicator');
    const formatSelection = document.getElementById('formatSelection');
    const videoFormatSelect = document.getElementById('videoFormat');
    const audioFormatSelect = document.getElementById('audioFormat');
    const resultParagraph = document.getElementById('result');

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultParagraph.textContent = ''; // Clear previous results

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/formats?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');

        if (response.ok && data.success) {
            // Clear previous options
            videoFormatSelect.innerHTML = '';
            audioFormatSelect.innerHTML = '';

            // Populate video formats dropdown
            data.formats.forEach(format => {
                if (format.mime.includes('video/')) {
                    const option = document.createElement('option');
                    option.value = format.itag;
                    option.textContent = `${format.resolution} (${format.quality})`;
                    videoFormatSelect.appendChild(option);
                }
            });

            // Populate audio formats dropdown
            data.formats.forEach(format => {
                if (format.mime.includes('audio/')) {
                    const option = document.createElement('option');
                    option.value = format.itag;
                    option.textContent = `${format.abr} kbps`;
                    audioFormatSelect.appendChild(option);
                }
            });

            // Show format selection section
            formatSelection.classList.remove('hidden');
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        resultParagraph.textContent = `Error fetching the formats: ${error.message}`;
    }
});

document.getElementById('streamBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoItag = document.getElementById('videoFormat').value;
    const audioItag = document.getElementById('audioFormat').value;
    const resultParagraph = document.getElementById('result');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultParagraph.textContent = ''; // Clear previous results

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/streaming?url=${encodeURIComponent(videoUrl)}&videoItag=${videoItag}&audioItag=${audioItag}`);
        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');

        if (response.ok && data.success) {
            const streamingLink = data.link;
            resultParagraph.innerHTML = `Streaming Link: <a href="${streamingLink}" target="_blank">Click here to stream</a>`;
            window.location.href = streamingLink; // Redirect to streaming URL
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        resultParagraph.textContent = `Error fetching the streaming link: ${error.message}`;
    }
});
