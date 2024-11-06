// Fill the welcome section
function fillWelcome(user1, user2, user3) {
    const welcomeMainLabel = document.getElementById("welcomeMainLabel")
    if (user2 != null && user3 != null) { // If there is 3 guests
        welcomeMainLabel.textContent = `Bienvenue ${user1.firstname}, ${user2.firstname} et ${user3.firstname} !\n\r Vous êtes invités au`
    } else if (user2 != null) { // If there is 2 guests
        welcomeMainLabel.textContent = `Bienvenue ${user1.firstname} et ${user2.firstname} !\n\r Vous êtes invités au`
    } else { // If there is one guest
        welcomeMainLabel.textContent = `Bienvenue ${user1.firstname} !\n\r Tu es invité au`
    }

    const welcomeDateLabel = document.getElementById("welcomeDateLabel")
    let dateString = ""
    if (user1.is_invited_friday) {
        if(user1.is_invited_sunday) {
            dateString += "14, "
        } else {
            dateString += "14 et "
        }
    }
    dateString += "15"
    if (user1.is_invited_sunday) {
        dateString += " et 16"
    }
    dateString += " février 2025"
    welcomeDateLabel.textContent = dateString
}

window.fillWelcome = fillWelcome