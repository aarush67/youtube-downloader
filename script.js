document.getElementById('fetchFormatsBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const loadingIndicator = document.getElementById('loadingIndicator');
    const videoFormatDropdown = document.getElementById('videoFormat');
    const audioFormatDropdown = document.getElementById('audioFormat');
    
    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    videoFormatDropdown.innerHTML = '';
    audioFormatDropdown.innerHTML = '';
    
    try {
        // Fetch video formats
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/formats?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');

        if (response.ok && data.success) {
            // Populate video format dropdown
            data.formats.forEach(format => {
                if (format.resolution) {
                    const option = document.createElement('option');
                    option.value = format.itag;
                    option.textContent = `${format.resolution} (${format.mime})`;
                    videoFormatDropdown.appendChild(option);
                }
            });

            // Populate audio format dropdown
            data.formats.forEach(format => {
                if (format.abr) {
                    const option = document.createElement('option');
                    option.value = format.itag;
                    option.textContent = `${format.abr} (${format.mime})`;
                    audioFormatDropdown.appendChild(option);
                }
            });

            // Show format selection
            document.getElementById('formatSelection').classList.remove('hidden');
        } else {
            document.getElementById('result').textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        document.getElementById('result').textContent = `Error fetching formats: ${error.message}`;
    }
});

document.getElementById('getStreamingUrlBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoItag = document.getElementById('videoFormat').value;
    const audioItag = document.getElementById('audioFormat').value;
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');

    try {
        // Send request to get streaming URL
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/streaming?videoItag=${videoItag}&audioItag=${audioItag}&url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');

        if (response.ok && data.success) {
            const streamingUrl = data.link; // Assuming the backend returns a streaming link
            document.getElementById('result').innerHTML = `Streaming URL: <a href="${streamingUrl}" target="_blank">Click here to stream</a>`;
        } else {
            document.getElementById('result').textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        document.getElementById('result').textContent = `Error getting streaming URL: ${error.message}`;
    }
});
