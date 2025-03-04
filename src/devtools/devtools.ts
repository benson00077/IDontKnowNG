console.log(chrome.devtools)
chrome.devtools.panels.elements.createSidebarPane("Ng.js", function (sidebar) {
  sidebar.setPage("panel.html");
  sidebar.setHeight("8ex");
});