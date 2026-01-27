document.getElementById('btnAdd').addEventListener('click', async () => {
  const courseCode = document.getElementById('courseCode').value;
  const statusDiv = document.getElementById('status');

  if (!courseCode) {
    statusDiv.textContent = "Please enter a course code.";
    return;
  }

  statusDiv.textContent = "Processing...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

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
