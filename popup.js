document.getElementById('btnStart').addEventListener('click', async () => {
  const rawInput = document.getElementById('courseList').value;
  const statusDiv = document.getElementById('status');

  if (!rawInput) {
    statusDiv.textContent = "Please enter course codes.";
    return;
  }

  const courses = rawInput.split(',')
                          .map(c => c.trim())
                          .filter(c => c.length > 0);

  if (courses.length === 0) {
    statusDiv.textContent = "No valid courses found.";
    return;
  }

  statusDiv.textContent = `Processing ${courses.length} courses...`;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Safety check: is the tab valid?
  if (!tab) {
      statusDiv.textContent = "Error: No active tab found.";
      return;
  }

  chrome.tabs.sendMessage(tab.id, { 
    action: "ADD_MULTIPLE", 
    courses: courses 
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      statusDiv.innerHTML = "<span style='color:red'><b>Error:</b> Refresh the Advising Page (F5) and try again.</span>";
    } else {
      statusDiv.textContent = "Queue started! Check the page.";
    }
  });
});