// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ADD_MULTIPLE") {
    processQueue(request.courses);
    sendResponse({status: "started"});
  }
  return true; 
});

// --- HELPER: Wait for time ---
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- HELPER: Simulate a "Real" Mouse Click ---
// Angular Material sometimes ignores .click(). This forces it.
function simulateClick(element) {
  const options = { bubbles: true, cancelable: true, view: window };
  element.dispatchEvent(new MouseEvent('mousedown', options));
  element.dispatchEvent(new MouseEvent('mouseup', options));
  element.dispatchEvent(new MouseEvent('click', options));
}

// --- HELPER: Smart Wait for Element ---
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

// --- MAIN LOGIC ---

async function processQueue(courses) {
  console.log(`CourseBot: Starting queue with ${courses.length} courses.`);

  for (let i = 0; i < courses.length; i++) {
    const courseCode = courses[i];
    console.log(`%c Processing ${i + 1}/${courses.length}: ${courseCode}`, 'background: #222; color: #bada55');
    
    await addSingleCourse(courseCode);
    
    // 1.5s delay between courses to let the table reset
    console.log("CourseBot: Waiting 1.5s before next course...");
    await wait(1500); 
  }
  
  console.log("CourseBot: Queue finished!");
  alert("All courses processed.");
}

async function addSingleCourse(courseCode) {
  
  // 1. Try to Clear Search first
  const clearIcon = document.querySelector('.ki-filter-edit');
  if (clearIcon) {
      simulateClick(clearIcon);
      await wait(300);
  }

  // 2. Type Course Code
  const filterInput = document.querySelector('input[placeholder="Quick filter..."]');
  if (!filterInput) {
    console.error("CourseBot: Filter input not found.");
    return;
  }

  filterInput.value = courseCode;
  filterInput.dispatchEvent(new Event('input', { bubbles: true }));
  filterInput.dispatchEvent(new Event('change', { bubbles: true }));

  console.log(`CourseBot: Searching for "${courseCode}"...`);

  // 3. WAIT for the Table to Update (Crucial Step)
  // We wait 1 second to ensure the old "Add" button is gone and the new one is ready.
  await wait(1000);

  // 4. FIND THE BUTTON
  // STRATEGY A: Look for aria-label "Add"
  let targetBtn = document.querySelector('button[aria-label="Add"]');
  
  // STRATEGY B: Look for the specific icon text "add_circle"
  if (!targetBtn) {
    console.log("CourseBot: 'Add' label not found. Searching for icon 'add_circle'...");
    const icons = document.querySelectorAll('mat-icon');
    for (const icon of icons) {
      if (icon.textContent.trim() === 'add_circle') {
        // Found the icon, get the button wrapping it
        targetBtn = icon.closest('button'); 
        break;
      }
    }
  }

  if (!targetBtn) {
    console.warn(`CourseBot: Could not find Add button for ${courseCode}. Skipping.`);
    return; 
  }

  // Visual Debug: Draw a red box around it
  targetBtn.style.border = "3px solid red"; 

  // *** DELAY: 500ms (Your request) ***
  await wait(500);
  
  // 5. CLICK (Using the Simulator)
  targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  console.log("CourseBot: Clicking...");
  
  // We use both methods to be safe
  simulateClick(targetBtn); 
  targetBtn.click(); 

  // 6. CONFIRMATION
  const yesBtn = await waitForElement('.swal2-confirm', 3000);
  
  if (yesBtn) {
    await wait(300);
    yesBtn.click();
    console.log(`CourseBot: Confirmed Add for ${courseCode}`);
    
    // Close Success Popup if it appears
    await wait(1000); 
    const okBtn = document.querySelector('.swal2-confirm');
    if (okBtn && okBtn.offsetParent !== null) {
        okBtn.click();
    }
  } else {
    console.warn("CourseBot: Confirmation popup missed.");
  }
}