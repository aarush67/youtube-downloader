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
                populateFormatDropdowns(data.formats);
                formatSelection.classList.remove("hidden");
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
            // Only include formats with audio and video
            if (format.mime.includes("video") && format.abr) {
                const option = document.createElement("option");
                option.value = format.itag;
                option.textContent = `${format.resolution} - ${format.quality} - ${format.abr}`;
                videoFormatSelect.appendChild(option);
            }

            if (format.mime.includes("audio")) {
                const option = document.createElement("option");
                option.value = format.itag;
                option.textContent = `${format.abr} - ${format.mime}`;
                audioFormatSelect.appendChild(option);
            }
        });
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
