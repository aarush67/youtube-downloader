document.getElementById('fetchFormatsBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultParagraph = document.getElementById('result');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const videoFormatDropdown = document.getElementById('videoFormat');
    const audioFormatDropdown = document.getElementById('audioFormat');
    
    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultParagraph.textContent = ''; // Clear previous results
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

            // Populate audio format dropdown (optional)
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
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        resultParagraph.textContent = `Error fetching formats: ${error.message}`;
    }
});

document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoItag = document.getElementById('videoFormat').value;
    const audioItag = document.getElementById('audioFormat').value;
    const subtitles = document.getElementById('subtitles').checked;
    const resultParagraph = document.getElementById('result');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    resultParagraph.textContent = ''; // Clear previous results

    try {
        // Send request to download
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?videoItag=${videoItag}&audioItag=${audioItag}&url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.classList.add('hidden');

        if (response.ok && data.success) {
            resultParagraph.innerHTML = `Download started!`;
        } else {
            resultParagraph.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        // Hide loading indicator in case of error
        loadingIndicator.classList.add('hidden');
        resultParagraph.textContent = `Error initiating download: ${error.message}`;
    }
});
