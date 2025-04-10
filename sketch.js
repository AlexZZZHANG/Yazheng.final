let memories = [];
let currentMemory = null;
let fireworks = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240, 230, 210); // Set a light background

    // Set up button behavior
    let memoryButton = select('#submitButton');
    memoryButton.mousePressed(submitMemory);

    // Try to load previously saved memories from localStorage
    let savedMemories = localStorage.getItem('memories');
    if (savedMemories) {
        memories = JSON.parse(savedMemories);
    }
    displayAllMemories();
}

function submitMemory() {
    let memoryText = select('#memoryInput').value();
    if (memoryText !== '') {
        let memory = {
            text: memoryText,
            timestamp: new Date().toLocaleString()
        };
        memories.push(memory);

        // Save to localStorage
        localStorage.setItem('memories', JSON.stringify(memories));

        // Trigger fireworks and display memory
        triggerFireworks();
        displayMemory(memory);
    } else {
        alert("Please enter a memory or goal.");
    }
}

function displayAllMemories() {
    let memoryText = select('#memoryDisplay');
    memoryText.html('');  // Clear the existing memory text

    for (let memory of memories) {
        let memoryDiv = createDiv(`<strong>Memory:</strong> ${memory.text}<br><em>Submitted at: ${memory.timestamp}</em>`);
        memoryDiv.position(width / 4, height / 4 + memories.indexOf(memory) * 100);
        memoryDiv.style('font-size', '20px');
        memoryDiv.style('color', '#333');
    }
}

function displayMemory(memory) {
    let memoryText = createDiv(`<strong>New Memory:</strong> ${memory.text}<br><em>Submitted at: ${memory.timestamp}</em>`);
    memoryText.position(width / 4, height / 2);
    memoryText.style('font-size', '24px');
    memoryText.style('color', '#5b3d43');
    memoryText.style('opacity', '0');
    
    // Fade-in effect for new memories
    let alpha = 0;
    let fadeInterval = setInterval(() => {
        if (alpha < 1) {
            alpha += 0.05;
            memoryText.style('opacity', alpha);
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

// Trigger fireworks effect when a new memory is submitted
function triggerFireworks() {
    for (let i = 0; i < 10; i++) {
        fireworks.push(new Firework(random(width), random(height - 100), random(255), random(255), random(255)));
    }
}

function draw() {
    // Draw fireworks and animate them
    for (let firework of fireworks) {
        firework.update();
        firework.display();
    }
}

// Firework class to create fireworks effects
class Firework {
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = 10;
        this.alpha = 255;
    }

    update() {
        this.size += 10;
        this.alpha -= 5;
    }

    display() {
        noStroke();
        fill(this.r, this.g, this.b, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}
