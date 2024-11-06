// Set the navBar burger menu behavior
function initNavBar() {
    const menuOpened = document.getElementById("menuOpened")
    document.getElementById("pageContent").addEventListener("click", function() {
        menuOpened.style.display = "none"
    })
    document.getElementById("burgerIcon").addEventListener("click", (event) => {
        if(menuOpened.style.display === "flex") {
            menuOpened.style.display = "none"
        } else {
            menuOpened.style.display = "flex"
        }
        event.stopImmediatePropagation()
    })
    document.getElementById("nav").addEventListener("click", function() {
        if(menuOpened.style.display === "flex") {
            menuOpened.style.display = "none"
        }
    })
}

window.initNavBar = initNavBar