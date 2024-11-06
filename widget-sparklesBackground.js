function getRandomOffset() {
    return Math.random() * 100 - 10;
}

function applySparklesBackground() {
    const sparklesBackgrounds = document.getElementsByClassName("sparklesBackground")
    for(var i = 0; i < sparklesBackgrounds.length; i++) {
        const sparklesBackground = sparklesBackgrounds[i]
        const sectionWidth = sparklesBackground.parentElement.clientWidth
        const sectionHeight = sparklesBackground.parentElement.clientHeight
        const rows = Math.floor(sectionHeight / 150);  // Number of virtual rows to put the sparkles
        let cols = 0;
        // Number of virtual columns to put the sparkles
        if (sectionWidth < 600) {
            cols = Math.floor(sectionWidth / 100);
        } else if (sectionWidth < 800) {
            cols = Math.floor(sectionWidth / 200);
        } else {
            cols = Math.floor(sectionWidth / 300);
        }

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
                const posX = (col / cols) * sectionWidth + getRandomOffset();
                const posY = (row / rows) * sectionHeight + getRandomOffset();
                sparkles.style.left = `${posX}px`;
                sparkles.style.top = `${posY}px`;
        
                sparklesBackground.appendChild(sparkles);
            }
        }
    }
}

window.applySparklesBackground = applySparklesBackground