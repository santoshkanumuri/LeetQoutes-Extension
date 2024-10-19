chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("leetcode.com/problems/")) {
    // Extract problem name from URL
    const urlParts = tab.url.split("/problems/");
    if (urlParts.length > 1) {
      const problemName = urlParts[1].split("/")[0];

      // Store the problem name in local storage
      chrome.storage.local.set({ problemName: problemName });
    }
  }
});
