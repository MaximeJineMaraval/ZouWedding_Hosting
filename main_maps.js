function fillMaps(user) {
    document.getElementById("mapCityHallItem").addEventListener("click", function() {
        window.open('https://maps.app.goo.gl/ifsNR4uJveJ7a8Vm8', '_blank')
    })
    document.getElementById("mapCastleItem").addEventListener("click", function() {
        window.open('https://maps.app.goo.gl/dKrXLt6pFgMSy6Mr6', '_blank')
    })

    const mapCityHallBlock = document.getElementById("mapCityHallBlock")
    if(user.is_invited_friday) {
        mapCityHallBlock.style.display = "flex"
    } else {
        mapCityHallBlock.style.display = "none"
    }

    const mapCastleTitle = document.getElementById("mapCastleTitle")
    if(user.is_invited_sunday) {
        mapCastleTitle.textContent = "Samedi et Dimanche" 
    } else {
        mapCastleTitle.textContent = "Samedi"
    }

    const mapSleepTitle = document.getElementById("mapSleepTitle")
    const mapSleepContent = document.getElementById("mapSleepContent")
    mapSleepTitle.hidden = !user.is_invited_sunday && !user.is_invited_full_saturday
    mapSleepContent.hidden = !user.is_invited_sunday && !user.is_invited_full_saturday
}

window.fillMaps = fillMaps