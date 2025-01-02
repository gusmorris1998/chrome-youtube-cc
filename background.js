chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
      console.log("Dynamic Rules:", rules);
    });
  });