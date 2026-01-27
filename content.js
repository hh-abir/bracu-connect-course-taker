chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ADD_COURSE") {
    executeAddCourse(request.code);
  }
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

async function executeAddCourse(courseCode) {
  console.log("CourseBot: Starting sequence for", courseCode);

  const filterInput = document.querySelector('input[placeholder="Quick filter..."]');
  if (!filterInput) {
    alert("Error: Could not find Filter input.");
    return;
  }

  filterInput.value = courseCode;
  filterInput.dispatchEvent(new Event('input', { bubbles: true }));
  filterInput.dispatchEvent(new Event('change', { bubbles: true }));

  const addButtonSelector = 'button[aria-label="Add"]';
  const targetBtn = await waitForElement(addButtonSelector, 5000);

  if (!targetBtn) {
    alert("Error: Add button not found.");
    return;
  }

  targetBtn.style.border = "2px solid red";

  await wait(500); 


  targetBtn.click();
  console.log("CourseBot: Clicked Add.");

  const yesButtonSelector = '.swal2-confirm';
  const confirmBtn = await waitForElement(yesButtonSelector, 3000);

  if (confirmBtn) {
    await wait(200); 
    
    confirmBtn.click();
    console.log("CourseBot: Confirmed Yes.");
  } else {
    console.log("CourseBot: Confirmation popup missing.");
  }
}
