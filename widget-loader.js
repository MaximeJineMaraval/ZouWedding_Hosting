// Simplify delay usage
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// Show loader with animation
async function showLoader(show) {
    const loaderContainer = document.getElementById("loaderContainer")
    if(show) {
        loaderContainer.style.display = "flex"
        await delay(10)
        loaderContainer.style.opacity = 1
    } else {
        loaderContainer.style.opacity = 0
        await delay(500)
        loaderContainer.style.display = "none"
    }
}

window.showLoader = showLoader;