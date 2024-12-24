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
        const captionsElement = document.getElementsByClassName("captions-text");
        const config = { attributes: true, childList: true, subtree: true };

        const captionChange = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === "childList") {
                    console.log("A child node has been added or removed.");
                  } else if (mutation.type === "attributes") {
                    console.log(`The ${mutation.attributeName} attribute was modified.`);
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(captionChange);

        // Start observing the target node for configured mutations
        observer.observe(captionsElement, config);
    };

})();