document.getElementById("downloadButton").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoUrlInput").value;

    try {
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev//download?url=${encodeURIComponent(videoUrl)}`);
        
        if (response.redirected) {
            window.location.href = response.url; // Automatically redirect to download link
        } else {
            const data = await response.json();
            if (!data.success) {
                alert(data.error);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to download the video.');
    }
});
