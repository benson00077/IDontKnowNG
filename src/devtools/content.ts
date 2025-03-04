declare global {
  interface Window {
    angular: any;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(sender)
  if (!window.angular) return;
  if (message.action === "getAngularInfo") {
    const el = document.querySelector(message.selector);
    if (!el) return;
    
    const ngEl = window.angular.element(el);
    sendResponse({
      scope: ngEl.scope(),
      controller: ngEl.controller(),
      injector: ngEl.injector(),
    });
  }
});