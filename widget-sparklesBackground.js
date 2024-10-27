function getRandomOffset() {
    return Math.random() * 100 - 10;
}

function applySparklesBackground() {
    const rows = Math.floor(window.innerHeight / 120);  // Number of virtual rows to put the sparkles
    const cols = Math.floor(window.innerWidth / 120);  // Number of virtual columns to put the sparkles
    console.log(`${window.innerHeight}`)
    console.log(`${rows}`)
    const sparkesBackground = document.getElementById('sparklesBackground');
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const sparkles = document.createElement('img');
            sparkles.style.position = "absolute";
            sparkles.src = "res/background_sparkles.png"
            sparkles.classList.add('sparkles');
    
            // Define sparkles size
            const size = 1;
            sparkles.style.width = `${size}em`;
            sparkles.style.height = `auto`;
    
            // Position the sparkles with random offset
            const posX = (col / cols) * window.innerWidth + getRandomOffset();
            const posY = (row / rows) * window.innerHeight + getRandomOffset();
            sparkles.style.left = `${posX}px`;
            sparkles.style.top = `${posY}px`;
    
            sparkesBackground.appendChild(sparkles);
        }
    }
}

window.applySparklesBackground = applySparklesBackground