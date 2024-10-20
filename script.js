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
        const videoUrl = videoUrlInput.value.trim();

        if (!isValidYouTubeUrl(videoUrl)) {
            alert("Please enter a valid YouTube video URL.");
            return;
        }

        toggleLoading(true);
        formatSelection.classList.add("hidden");
        result.textContent = ""; // Clear previous result

        try {
            const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/formats?url=${encodeURIComponent(videoUrl)}`);
            const data = await response.json();

            if (data.success && data.formats && data.formats.length > 0) {
                populateFormatDropdowns(data.formats);
                formatSelection.classList.remove("hidden");
            } else {
                alert("No formats available for this video or an error occurred.");
            }
        } catch (error) {
            console.error("Error fetching formats:", error);
            alert(`Error fetching formats: ${error.message}`);
        } finally {
            toggleLoading(false);
        }
    });

    // Function to check if the URL is a valid YouTube link
    function isValidYouTubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(url);
    }

    // Function to show or hide the loading indicator
    function toggleLoading(isLoading) {
        if (isLoading) {
            loadingIndicator.classList.remove("hidden");
        } else {
            loadingIndicator.classList.add("hidden");
        }
    }

    // Function to populate format dropdowns
    function populateFormatDropdowns(formats) {
        // Clear previous options
        videoFormatSelect.innerHTML = "";
        audioFormatSelect.innerHTML = "";

        formats.forEach((format) => {
            const { itag, resolution, mime, quality, abr } = format;
            
            if (mime) {
                const option = document.createElement("option");
                option.value = itag;

                // Add video formats
                if (mime.includes("video")) {
                    option.textContent = `${resolution || 'Unknown'} - ${mime} - ${quality || 'N/A'}`;
                    videoFormatSelect.appendChild(option);
                } 
                // Add audio formats
                else if (mime.includes("audio")) {
                    option.textContent = `${abr || 'N/A'} kbps - ${mime}`;
                    audioFormatSelect.appendChild(option);
                }
            }
        });

        // Notify if no valid formats were found
        if (!videoFormatSelect.options.length && !audioFormatSelect.options.length) {
            alert("No valid formats found for this video.");
        }
    }

    // Event listener to get streaming URL
    streamBtn.addEventListener("click", async () => {
        const videoUrl = videoUrlInput.value.trim();
        const videoItag = videoFormatSelect.value;
        const audioItag = audioFormatSelect.value;

        if (!videoItag || !audioItag) {
            alert("Please select both video and audio formats.");
            return;
        }

        toggleLoading(true);

        try {
            const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/streaming?url=${encodeURIComponent(videoUrl)}&videoItag=${videoItag}&audioItag=${audioItag}`);
            const data = await response.json();

            if (data.success) {
                result.innerHTML = `<a href="${data.link}" target="_blank">Click here to stream</a>`;
            } else {
                alert(`Error fetching streaming URL: ${data.error}`);
            }
        } catch (error) {
            console.error("Error fetching streaming URL:", error);
            alert(`Error fetching streaming URL: ${error.message}`);
        } finally {
            toggleLoading(false);
        }
    });
});
