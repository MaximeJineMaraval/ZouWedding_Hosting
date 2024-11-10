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

    var prevScrollpos = window.scrollY;
    window.onscroll = function() {
        var currentScrollPos = window.scrollY;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav").style.top = "0";
        } else {
            document.getElementById("nav").style.top = "-100px";
            menuOpened.style.display = "none"
        }
        prevScrollpos = currentScrollPos;
    }
}

window.initNavBar = initNavBar