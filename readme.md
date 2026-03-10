

# BRACU Connect: Auto-Advising Extension 🚀

Streamline your advising process at BRAC University. This extension allows you to pre-fill your desired courses and sections, automatically submitting them the millisecond the advising window opens.

### 🎥 Feature Showcase

<video src="https://github.com/hh-abir/bracu-connect-course-taker/blob/main/docs/showcase.mp4" width="100%" controls></video>

---

## 🌟 Features

* **Pre-emptive Queue:** Add your desired courses and section numbers before the site even opens.
* **Auto-Submit:** The extension monitors the clock and triggers the "Add Course" action as soon as the advising period starts.
* **Simple UI:** A lightweight popup interface that doesn't clutter your browsing experience.
* **Conflict Prevention:** Keeps track of what you've added to help you stay organized during the rush.

---

## 🛠 Installation

Since this is a custom extension, follow these steps to install it in your browser:

1. **Download/Clone** this repository to your local machine.
2. Open **Chrome** (or any Chromium-based browser like Edge or Brave).
3. Navigate to `chrome://extensions/`.
4. Enable **"Developer mode"** (usually a toggle in the top right corner).
5. Click on **"Load unpacked"** and select the folder containing the extension files.

---

## 📖 How to Use

1. **Open the Extension:** Click the BRACU Connect icon in your browser toolbar.
2. **Enter Course Details:** Type the course code (e.g., `CSE110`) and the specific section (e.g., `01`).
3. **Queue It:** Click the **"Add Course"** button. The course will appear in your "Pending" list.
4. **Stay on the Page:** Open the BRACU advising portal.
5. **Relax:** As soon as the system clock hits your advising time, the extension will attempt to inject and submit those courses for you.

---

## 💻 Tech Stack

* **JavaScript (ES6+):** For the core logic and DOM manipulation.
* **HTML/CSS:** For the popup interface.
* **Chrome Extension API:** For storage and content script injection.

---

## ⚠️ Disclaimer

This tool is intended to assist students with the manual burden of clicking during advising. Please ensure you have a stable internet connection. The developers are not responsible for courses missed due to server timeouts or incorrect section input.

---

## 🤝 Contributing

Suggestions and bug reports are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

