// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'problemDetected') {
    const problemId = message.problemId;

    // Here you can modify the DOM, e.g., inject buttons or display quotes
    const quoteDiv = document.createElement('div');
    quoteDiv.innerText = `question: ${problemId}`;
    document.body.appendChild(quoteDiv); // Example: Inject into the page

    // You can also send a response back to the popup or other scripts
    sendResponse({ status: 'Problem ID received', problemId: problemId });
  }
});
