// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ADD_COURSE") {
    executeAddCourse(request.code);
  }
});

// Helper: Standard Delay
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper: Smart Wait (Polls until element exists)
function waitForElement(selector, timeout) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        resolve(null);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

async function executeAddCourse(courseCode) {
  console.log("CourseBot: Starting sequence for", courseCode);

  // --- STEP 1: TYPE IN FILTER ---
  const filterInput = document.querySelector('input[placeholder="Quick filter..."]');
  if (!filterInput) {
    alert("Error: Could not find Filter input.");
    return;
  }

  // Type value and trigger events
  filterInput.value = courseCode;
  filterInput.dispatchEvent(new Event('input', { bubbles: true }));
  filterInput.dispatchEvent(new Event('change', { bubbles: true }));

  // --- STEP 2: FIND BUTTON ---
  // Wait up to 5 seconds for the button to appear in the DOM
  const addButtonSelector = 'button[aria-label="Add"]';
  const targetBtn = await waitForElement(addButtonSelector, 5000);

  if (!targetBtn) {
    alert("Error: Add button not found.");
    return;
  }

  // Highlight it briefly
  targetBtn.style.border = "2px solid red";

  // *** DELAY: 0.2 Seconds ***
  await wait(500); 

  // --- STEP 3: CLICK ADD ---
  targetBtn.click();
  console.log("CourseBot: Clicked Add.");

  // --- STEP 4: CONFIRMATION ---
  const yesButtonSelector = '.swal2-confirm';
  const confirmBtn = await waitForElement(yesButtonSelector, 3000);

  if (confirmBtn) {
    // *** DELAY: 0.2 Seconds ***
    await wait(200); 
    
    confirmBtn.click();
    console.log("CourseBot: Confirmed Yes.");
  } else {
    console.log("CourseBot: Confirmation popup missing.");
  }
}