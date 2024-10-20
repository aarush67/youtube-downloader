document.addEventListener("DOMContentLoaded", () => {
    const getFormatsBtn = document.getElementById("getFormatsBtn");
    const videoUrlInput = document.getElementById("videoUrl");
    const formatSelection = document.getElementById("formatSelection");
    const videoFormatSelect = document.getElementById("videoFormat");
    const audioFormatSelect = document.getElementById("audioFormat");
    const streamBtn = document.getElementById("streamBtn");
    const result = document.getElementById("result");
    const loadingIndicator = document.getElementById("loading");

    // Event listener to fetch available formats
    getFormatsBtn.addEventListener("click", async () => {
        const videoUrl = videoUrlInput.value;

        if (!videoUrl) {
            alert("Please enter a valid YouTube video URL.");
            return;
        }

        loadingIndicator.classList.remove("hidden");
        formatSelection.classList.add("hidden");
        result.textContent = ""; // Clear previous result

        try {
            const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/formats?url=${encodeURIComponent(videoUrl)}`);
            const data = await response.json();

            if (data.success) {
                // Check if formats are available and parse them correctly
                if (data.formats && data.formats.length > 0) {
                    populateFormatDropdowns(data.formats);
                    formatSelection.classList.remove("hidden");
                } else {
                    alert("No formats available for this video.");
                }
            } else {
                alert(`Error fetching formats: ${data.error}`);
            }
        } catch (error) {
            alert(`Error fetching formats: ${error.message}`);
        } finally {
            loadingIndicator.classList.add("hidden");
        }
    });

    // Function to populate dropdowns with formats
    function populateFormatDropdowns(formats) {
        // Clear previous options
        videoFormatSelect.innerHTML = "";
        audioFormatSelect.innerHTML = "";

        formats.forEach((format) => {
            // Clean up the format data to prevent any malformed entries
            const { itag, resolution, mime, quality, abr } = format;

            // Check if the format has valid data and is not corrupted
            if (mime && resolution && (mime.includes("video") || mime.includes("audio"))) {
                if (mime.includes("video")) {
                    const option = document.createElement("option");
                    option.value = itag;
                    option.textContent = `${resolution} - ${mime} - ${quality || 'N/A'}`;
                    videoFormatSelect.appendChild(option);
                } else if (mime.includes("audio")) {
                    const option = document.createElement("option");
                    option.value = itag;
                    option.textContent = `${abr || 'N/A'} - ${mime}`;
                    audioFormatSelect.appendChild(option);
                }
            }
        });

        // Show an alert if no valid formats were found
        if (!videoFormatSelect.options.length && !audioFormatSelect.options.length) {
            alert("No valid formats found for this video.");
        }
    }

    // Event listener to get streaming URL
    streamBtn.addEventListener("click", async () => {
        const videoUrl = videoUrlInput.value;
        const videoItag = videoFormatSelect.value;
        const audioItag = audioFormatSelect.value;

        if (!videoItag || !audioItag) {
            alert("Please select both video and audio formats.");
            return;
        }

        loadingIndicator.classList.remove("hidden");

        try {
            const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/streaming?url=${encodeURIComponent(videoUrl)}&videoItag=${videoItag}&audioItag=${audioItag}`);
            const data = await response.json();

            if (data.success) {
                result.textContent = `Streaming URL: ${data.link}`;
            } else {
                alert(`Error fetching streaming URL: ${data.error}`);
            }
        } catch (error) {
            alert(`Error fetching streaming URL: ${error.message}`);
        } finally {
            loadingIndicator.classList.add("hidden");
        }
    });
});
