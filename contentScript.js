// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.
    // Basically the local scope of each tab, eliminating conflicts via global variables
(() => {

    const wordClick = () => {
        console.log('Click!')
    }

    const convertTextToClickable = (text) => {
        const words = text.split(" ");
        const fragment = document.createDocumentFragment();

        words.forEach(word => {
            const a = document.createElement('a');
            a.textContent = word
            a.addEventListener('click', wordClick)

            fragment.appendChild(a);
            // Creates a space at each word
            fragment.appendChild(document.createTextNode(" "))
            
        });
        
        return fragment;
    };

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

        if (captionsElement) {
            const observer = new MutationObserver((mutationList) => {
                console.log("IM IN!!")
                
                const captionsText = document.querySelector('.captions-text');
                const captionLines = captionsText.querySelectorAll('.caption-visual-line')

                observer.disconnect()
                for (let i = 0; i < captionLines.length; i++) {

                    const captionLine = captionLines[i].querySelector('.ytp-caption-segment');
                    // console.log(captionLine.innerHTML)

                    // Clear innerHTML
                    captionLine.innerHTML = '';

                    captionLine.appendChild(convertTextToClickable(captionLine.textContent));

                }
                observer.observe(captionsElement, {childList: true, subtree: true, characterData: true})
            });

            observer.observe(captionsElement, {childList: true, subtree: true, characterData: true})
            console.log(captionsElement)

        } else {
            console.error("Captions parent not found. Ensure captions are enabled!");
        }

    };

})();