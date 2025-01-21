// Global utility function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Typewriter {
  constructor(element, baseText, words) {
    this.element = element;
    this.baseText = baseText;
    this.baseTextEndIndex = baseText.lastIndexOf(" ") + 1;
    this.words = words;
  }

  // Remove sleep method from class

  getCurrentText(wordIdx, cursorIdx) {
    if (wordIdx === 0) {
      return (this.baseText + this.words[wordIdx]).slice(0, cursorIdx);
    } else if (wordIdx === this.words.length - 1) {
      return this.baseText + this.words[wordIdx].slice(0, cursorIdx);
    } else {
      return this.baseText + "a " + this.words[wordIdx].slice(0, cursorIdx);
    }
  }

  async typeText(wordIdx, startCursorPos = 0, typeSpeed = 75, duration = 500) {
    let endCursorPos = this.baseText.length + this.words[wordIdx].length;
    if (wordIdx !== 0 || wordIdx !== this.words.length - 1) {
      endCursorPos += 2;
    }

    const currentText = this.getCurrentText(wordIdx, startCursorPos);
    this.element.textContent =
      currentText + (startCursorPos === endCursorPos ? "" : "|");

    if (startCursorPos === endCursorPos) {
      duration =
        wordIdx === 0
          ? 2000
          : wordIdx === this.words.length - 1
          ? 4000
          : duration;

      const cursorInterval = setInterval(() => {
        this.element.textContent =
          currentText + (this.element.textContent.includes("|") ? "" : "|");
      }, 500);

      await sleep(duration); // Use global sleep
      clearInterval(cursorInterval);
      this.element.textContent = currentText;
      return;
    }

    await sleep(typeSpeed); // Use global sleep
    typeSpeed = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    await this.typeText(wordIdx, startCursorPos + 1, typeSpeed);
  }

  async backspaceText(wordIdx, startCursorPos = null, endCursorPos = null) {
    startCursorPos = startCursorPos ?? this.words[wordIdx].length;
    endCursorPos =
      endCursorPos ??
      this.baseTextEndIndex +
        (wordIdx !== 0 && wordIdx !== this.words.length - 1 ? 2 : 0);

    const newBaseText =
      this.baseText +
      (wordIdx !== 0 && wordIdx !== this.words.length - 1 ? "a " : "");

    const currentText =
      newBaseText + this.words[wordIdx].slice(0, startCursorPos);

    this.element.textContent =
      currentText + (currentText.length === endCursorPos ? "" : "|");

    if (currentText.length === endCursorPos) {
      const cursorInterval = setInterval(() => {
        this.element.textContent =
          currentText + (this.element.textContent.includes("|") ? "" : "|");
      }, 500);
      await sleep(500);
      clearInterval(cursorInterval);
      this.element.textContent = currentText;
      return;
    }

    await sleep(75);
    await this.backspaceText(wordIdx, startCursorPos - 1, endCursorPos);
  }

  async runSequence() {
    for (let i = 0; i < this.words.length - 1; i++) {
      await this.typeText(i);
      await this.backspaceText(i);
    }
    await this.typeText(this.words.length - 1);
    const wordLength = this.words[this.words.length - 1].length;
    const endPosition = this.baseTextEndIndex + wordLength - 3;
    await this.backspaceText(this.words.length - 1, null, endPosition);
  }
}

class PageDirection {
  constructor() {
    this.contentWrapper = document.querySelector(".content-wrapper");
    this.navItems = document.querySelectorAll(".nav-item");
    this.switchButton = document.getElementById("switchButton"); // Store the switchButton reference
    this.init();
  }

  init() {
    // If localStorage is null/undefined, use false as default (LTR)
    localStorage.removeItem("rtlEnabled"); 

    // Check if rtlEnabled is stored in localStorage key pair 
    const rtlValue = localStorage.getItem("rtlEnabled");

    // If null, set to true, else use the bool value from localStorage
    const rtlEnabled = rtlValue === null ? true : rtlValue === "enabled";

    if (rtlEnabled) {
      this.contentWrapper.classList.add("rtl");
      this.navItems.forEach((item) => item.classList.add("rtl"));
      this.switchButton.checked = false; // Set switch to checked if RTL is enabled
    } else {
      this.contentWrapper.classList.remove("rtl");
      this.navItems.forEach((item) => item.classList.remove("rtl"));

      this.switchButton.checked = true; // Set switch to unchecked if RTL is disabled
    }

    this.switchButton.addEventListener("change", () => this.toggleDirection());
  }

  toggleDirection() {
    if (!this.switchButton.checked) {
      this.contentWrapper.classList.add("rtl");
      this.navItems.forEach((item) => item.classList.add("rtl"));
      localStorage.setItem("rtlEnabled", "enabled");
      console.log("RTL mode enabled");
    } else {
      this.contentWrapper.classList.remove("rtl");
      this.navItems.forEach((item) => item.classList.remove("rtl"));
      localStorage.setItem("rtlEnabled", "disabled");
      console.log("RTL mode disabled");
    }
  }
}

class DarkMode {
  constructor() {
    this.themeButton = document.getElementById("themeButton");
    this.init();
  }

  init() {
    // Initialize dark mode based on user's preference or system setting
    const systemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // checks for local storage enabled
    const storedDarkMode = localStorage.getItem("darkMode");

    const darkModeEnabled =
      storedDarkMode === "enabled" ||
      (storedDarkMode === null && systemDarkMode);

    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
      this.themeButton.checked = false; // Set to true when dark mode is enabled
    } else {
      document.body.classList.remove("dark-mode");
      this.themeButton.checked = true; // Ensure the switch reflects light mode
    }

    this.themeButton.addEventListener("change", () => this.toggleDarkMode());
  }

  toggleDarkMode() {
    if (!this.themeButton.checked) {
      // Checked = Dark Mode
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      // Checked = Light Mode
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }
}

class RandomTheme {
  constructor() {
    this.body = document.body;
    this.randomThemeButton = document.getElementById("randomThemeButton");
    this.themeClasses = ["theme-default", "theme-sage", "theme-terra"];
    this.currentTheme = 0; // Store current theme Idx
    this.init();
  }

  init() {
    this.randomThemeButton?.addEventListener("click", () =>
      this.setRandomTheme()
    );
  }

  setRandomTheme() {
    const currTheme = this.themeClasses[this.currentTheme];

    // Remove current theme first
    this.body.classList.remove(currTheme);

    this.currentTheme += 1; // Update current theme
    if (this.currentTheme === this.themeClasses.length) {
      this.currentTheme = 0;
    }

    const nextTheme = this.themeClasses[this.currentTheme];
    this.body.classList.add(nextTheme);
  }
}

new DarkMode(); // Initialize DarkMode after DOM is loaded
new PageDirection(); // Initialize PageDirection after DOM is loaded

document.addEventListener("DOMContentLoaded", function () {
  const h1 = document.getElementById("header-text");
  const baseText = "Hi, I'm ";

  // Format: ["name", .... adjectives, ... "name"]
  const words = [
    "Rohit!",
    "Coder.",
    "Designer.",
    "Data-Nerd.",
    "Student.",
    "Rohit. :) ",
  ];

  const typewriter = new Typewriter(h1, baseText, words);
  typewriter.runSequence();
  new RandomTheme();
});
