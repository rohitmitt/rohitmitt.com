// Global utility function
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
        this.element.textContent = currentText + (startCursorPos === endCursorPos ? "" : "|");

        if (startCursorPos === endCursorPos) {
            duration = wordIdx === 0 ? 2000 : wordIdx === this.words.length - 1 ? 4000 : duration;
            
            const cursorInterval = setInterval(() => {
                this.element.textContent = currentText + (this.element.textContent.includes("|") ? "" : "|");
            }, 500);
            
            await sleep(duration); // Use global sleep
            clearInterval(cursorInterval);
            this.element.textContent = currentText;
            return;
        }

        await sleep(typeSpeed); // Use global sleep
        typeSpeed = Math.floor(Math.random() * (75 - 50 + 1)) + 50;
        await this.typeText(wordIdx, startCursorPos + 1, typeSpeed);
    }

    async backspaceText(wordIdx, startCursorPos = null, endCursorPos = null) {
        startCursorPos = startCursorPos ?? this.words[wordIdx].length;
        endCursorPos = endCursorPos ?? (this.baseTextEndIndex + 
            (wordIdx !== 0 && wordIdx !== this.words.length - 1 ? 2 : 0));
        
        const newBaseText = this.baseText + 
            (wordIdx !== 0 && wordIdx !== this.words.length - 1 ? "a " : "");
        
        const currentText = newBaseText + this.words[wordIdx].slice(0, startCursorPos);
        this.element.textContent = currentText + 
            (currentText.length === endCursorPos ? "" : "|");

        if (currentText.length === endCursorPos) {
            const cursorInterval = setInterval(() => {
                this.element.textContent = currentText + 
                    (this.element.textContent.includes("|") ? "" : "|");
            }, 500);
            await sleep(500);
            clearInterval(cursorInterval);
            this.element.textContent = currentText;
            return;
        }

        await sleep(100);
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
        this.contentWrapper = document.querySelector('.content-wrapper');
        this.init();
    }

    init() {
        const switchButton = document.getElementById('switchButton');
        switchButton.addEventListener('click', () => this.toggleDirection());
    }

    toggleDirection() {
        this.contentWrapper.classList.toggle('rtl');
    }

}

document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.getElementById('header-text');
    const baseText = "Hi, I'm ";
    const words = ["Rohit!", "developer", "creator", "learner", "human", "Rohit. :) "];
    
    const typewriter = new Typewriter(h1, baseText, words);
    typewriter.runSequence();
    

    new PageDirection();
});
