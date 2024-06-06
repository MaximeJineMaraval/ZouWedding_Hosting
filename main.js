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

// Update Planning
const planningFridayBlock = document.getElementById("planningFridayBlock")
const planningSundayBlock = document.getElementById("planningSundayBlock")
planningFridayBlock.hidden = !user.is_invited_friday
planningSundayBlock.hidden = !user.is_invited_sunday

const planningSaturdayTitle = document.getElementById("planningSaturdayTitle")
const planningSaturdayHour = document.getElementById("planningSaturdayHour")
if(user.is_invited_full_saturday) {
    planningSaturdayTitle.textContent = "Cérémonie, Cocktail & Soirée"
    planningSaturdayHour.textContent = "16h00"
} else {
    planningSaturdayTitle.textContent = "Cocktail"
    planningSaturdayHour.textContent = "18h00"
}
