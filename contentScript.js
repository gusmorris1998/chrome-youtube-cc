// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.
    // Basically the local scope of each tab, eliminating conflicts via global variables
(() => {
    // Accessing the yt player and controls
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    // Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();

        }
    });

    const newVideoLoaded = () => {

        // const captionsElement = document.querySelector(".captions-text");
        const captionsElement = document.querySelector('.ytp-caption-window-container');
        // const config = { attributes: true, childList: true, subtree: true };

        if (captionsElement) {
            const observer = new MutationObserver((mutationList) => {
                console.log("IM IN!!")
                for (const mutation of mutationList) {
                    console.log(mutation)
                    if (mutation.type === 'childList') {
                    }
                }
            });

            observer.observe(captionsElement, {childList: true, subtree: true, characterData: true})
            console.log(captionsElement)

        } else {
            console.error("Captions parent not found. Ensure captions are enabled!");
        }

    };

})();