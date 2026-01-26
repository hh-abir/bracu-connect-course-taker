chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ADD_MULTIPLE") {
    processQueue(request.courses);
    sendResponse({status: "started"});
  }
  return true; 
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function simulateClick(element) {
  const options = { bubbles: true, cancelable: true, view: window };
  element.dispatchEvent(new MouseEvent('mousedown', options));
  element.dispatchEvent(new MouseEvent('mouseup', options));
  element.dispatchEvent(new MouseEvent('click', options));
}

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


async function processQueue(courses) {
  console.log(`CourseBot: Starting queue with ${courses.length} courses.`);

  for (let i = 0; i < courses.length; i++) {
    const courseCode = courses[i];
    console.log(`%c Processing ${i + 1}/${courses.length}: ${courseCode}`, 'background: #222; color: #bada55');
    
    await addSingleCourse(courseCode);
    
    console.log("CourseBot: Waiting 1.5s before next course...");
    await wait(1500); 
  }
  
  console.log("CourseBot: Queue finished!");
  alert("All courses processed.");
}

async function addSingleCourse(courseCode) {
  
  const clearIcon = document.querySelector('.ki-filter-edit');
  if (clearIcon) {
      simulateClick(clearIcon);
      await wait(300);
  }

  const filterInput = document.querySelector('input[placeholder="Quick filter..."]');
  if (!filterInput) {
    console.error("CourseBot: Filter input not found.");
    return;
  }

  filterInput.value = courseCode;
  filterInput.dispatchEvent(new Event('input', { bubbles: true }));
  filterInput.dispatchEvent(new Event('change', { bubbles: true }));

  console.log(`CourseBot: Searching for "${courseCode}"...`);

  
  await wait(1000);


  let targetBtn = document.querySelector('button[aria-label="Add"]');
  
  if (!targetBtn) {
    console.log("CourseBot: 'Add' label not found. Searching for icon 'add_circle'...");
    const icons = document.querySelectorAll('mat-icon');
    for (const icon of icons) {
      if (icon.textContent.trim() === 'add_circle') {
        targetBtn = icon.closest('button'); 
        break;
      }
    }
  }

  if (!targetBtn) {
    console.warn(`CourseBot: Could not find Add button for ${courseCode}. Skipping.`);
    return; 
  }

  targetBtn.style.border = "3px solid red"; 

  await wait(500);
  
  targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  console.log("CourseBot: Clicking...");
  
  simulateClick(targetBtn); 
  targetBtn.click(); 

  const yesBtn = await waitForElement('.swal2-confirm', 3000);
  
  if (yesBtn) {
    await wait(300);
    yesBtn.click();
    console.log(`CourseBot: Confirmed Add for ${courseCode}`);
    
    await wait(1000); 
    const okBtn = document.querySelector('.swal2-confirm');
    if (okBtn && okBtn.offsetParent !== null) {
        okBtn.click();
    }
  } else {
    console.warn("CourseBot: Confirmation popup missed.");
  }
}