function fillMaps(user) {
    // Define click on maps
    document.getElementById("mapCityHallItem").addEventListener("click", function() {
        window.open('https://maps.app.goo.gl/ifsNR4uJveJ7a8Vm8', '_blank')
    })
    document.getElementById("mapCastleItem").addEventListener("click", function() {
        window.open('https://maps.app.goo.gl/dKrXLt6pFgMSy6Mr6', '_blank')
    })

    // Show friday if needed
    const mapCityHallBlock = document.getElementById("mapCityHallBlock")
    if(user.is_invited_friday) {
        mapCityHallBlock.style.display = "flex"
    } else {
        mapCityHallBlock.style.display = "none"
    }

    // Set saturday title
    const mapCastleTitle = document.getElementById("mapCastleTitle")
    if(user.is_invited_sunday) {
        mapCastleTitle.textContent = "Samedi et Dimanche" 
    } else {
        mapCastleTitle.textContent = "Samedi"
    }

    // Show sleep section if needed
    const mapSleepTitle = document.getElementById("mapSleepTitle")
    const mapSleepContent = document.getElementById("mapSleepContent")
    mapSleepTitle.hidden = !user.is_invited_sunday
    mapSleepContent.hidden = !user.is_invited_sunday
    // Set sleep labels
    if(user.is_invited_to_sleep) {
        mapSleepTitle.textContent = "Et si tu dormais sur place avec nous ?"
        mapSleepContent.textContent = "[TO MODIFY] Il faut définir un texte ici pour dire qu'ils sont invités au chateau, qu'on demande X euros de défraiements pour les 2 nuits"
    } else {
        mapSleepTitle.textContent = "Besoin de dormir dans les environs ?"
        mapSleepContent.textContent = "[TO MODIFY] Il faut définir un texte ici pour dire qu'il y a la ville d'Arras et de Douai."
    }
}

window.fillMaps = fillMaps