chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(100, message)
  console.log(101, sender)
  sendResponse({ response: "Message received and responded" });
  console.log("Received message:", message);
});