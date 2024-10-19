document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('videoUrl').value;

    // Validate URL
    if (!url) {
        alert('Please enter a valid YouTube URL.');
        return; // Prevent further execution if the URL is empty
    }

    try {
        // Request to download the video
        const response = await fetch(`https://9c628245-3814-4ecd-a755-6d4de0467c5c-00-3tzwugoleljgd.spock.replit.dev/download?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Trigger the download
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'video.mp4'; // You can set a different name if needed
        link.click();

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to download the video. Please try again.');
    }
});
