const form = document.getElementById("urlForm");
const videoFormatSelect = document.getElementById("videoFormat");
const audioFormatSelect = document.getElementById("audioFormat");
const formatSelection = document.getElementById("formatSelection");
const loadingIndicator = document.getElementById("loading");
const resultParagraph = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    const videoUrl = document.getElementById("videoUrl").value;
    loadingIndicator.classList.remove('hidden'); // Show loading indicator

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/formats?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        loadingIndicator.classList.add('hidden'); // Hide loading indicator

        if (response.ok && data.success) {
            // Clear previous options
            videoFormatSelect.innerHTML = '';
            audioFormatSelect.innerHTML = '';

            // Populate video formats dropdown
            const videoFormats = data.formats.filter(format => format.mime.includes('video/'));
            videoFormats.forEach(format => {
                const option = document.createElement('option');
                option.value = format.itag;
                option.textContent = `${format.resolution} (${format.quality})`;
                videoFormatSelect.appendChild(option);
            });

            // Populate audio formats dropdown
            const audioFormats = data.formats.filter(format => format.mime.includes('audio/'));
            audioFormats.forEach(format => {
                const option = document.createElement('option');
                option.value = format.itag;
                option.textContent = `${format.abr} kbps`;
                audioFormatSelect.appendChild(option);
            });

            // Show format selection section if there are formats
            if (videoFormats.length > 0 || audioFormats.length > 0) {
                formatSelection.classList.remove('hidden');
            } else {
                resultParagraph.textContent = 'No valid formats available for this video.';
            }
        } else {
            resultParagraph.textContent = `Error: ${data.error || 'Unknown error'}`;
        }
    } catch (error) {
        loadingIndicator.classList.add('hidden'); // Hide loading indicator
        resultParagraph.textContent = `Error fetching the formats: ${error.message}`;
        console.error(error);
    }
});
