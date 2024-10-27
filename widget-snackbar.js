// Show snackBar at the screen's bottom
function showSnackbar(text) {
    let snackbar = document.getElementById("snackbar")
    snackbar.textContent = text
    snackbar.className = "show"
    setTimeout(function() { 
        snackbar.className = snackbar.className.replace("show", "")
    }, 5000)
}

window.showSnackbar = showSnackbar