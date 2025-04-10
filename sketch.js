let memories = [];
let currentMemory = null;

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

        // Display the new memory and show an animation
        displayMemory(memory);
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
