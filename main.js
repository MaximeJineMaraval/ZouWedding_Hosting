// Data
if(sessionStorage.user === undefined) {
    window.location.href = "index.html"
}
const user = JSON.parse(sessionStorage.user)

// Update Header
const headerWelcomeLabel = document.getElementById("headerWelcomeLabel")
headerWelcomeLabel.textContent = `Bienvenue ${user.firstname} ! Tu es invité au`

const headerDateLabel = document.getElementById("headerDateLabel")
let dateString = ""
if (user.is_invited_friday) {
    if(user.is_invited_sunday) {
        dateString += "14, "
    } else {
        dateString += "14 & "
    }
}
dateString += "15"
if (user.is_invited_sunday) {
    dateString += " & 16"
}
dateString += " février 2025"
headerDateLabel.textContent = dateString
