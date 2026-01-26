document.getElementById('btnAdd').addEventListener('click', async () => {
  const courseCode = document.getElementById('courseCode').value;
  const statusDiv = document.getElementById('status');

  if (!courseCode) {
    statusDiv.textContent = "Please enter a course code.";
    return;
  }

  statusDiv.textContent = "Processing...";

  // Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send a message to the content script running on the page
  chrome.tabs.sendMessage(tab.id, { 
    action: "ADD_COURSE", 
    code: courseCode 
  }, (response) => {
    if (chrome.runtime.lastError) {
      statusDiv.textContent = "Error: Refresh the page and try again.";
    } else {
      statusDiv.textContent = "Command sent!";
    }
  });
});