function getRandomOffset() {
    return Math.random() * 100 - 10;
}

function applySparklesBackground() {
    const rows = Math.floor(window.innerHeight / 150);  // Number of virtual rows to put the sparkles
    let cols = 0;
    // Number of virtual columns to put the sparkles
    if (window.innerWidth < 600) {
        cols = Math.floor(window.innerWidth / 100);
    } else if (window.innerWidth < 800) {
        cols = Math.floor(window.innerWidth / 150);
    } else {
        cols = Math.floor(window.innerWidth / 300);
    }
    console.log(window.innerWidth)
    
    const sparklesBackgrounds = document.getElementsByClassName("sparklesBackground")
    for(var i = 0; i < sparklesBackgrounds.length; i++) {
        const sparklesBackground = sparklesBackgrounds[i]
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
        
                sparklesBackground.appendChild(sparkles);
            }
        }
    }
}

window.applySparklesBackground = applySparklesBackground