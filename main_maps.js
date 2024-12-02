function fillMaps(user, isMultipleGuest) {
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
        mapCastleTitle.textContent = "Samedi et Dimanche - Le Clos Barthélemy" 
    } else {
        mapCastleTitle.textContent = "Samedi - Le Clos Barthélemy"
    }

    // Show sleep section if needed
    const mapSleepTitle = document.getElementById("mapSleepTitle")
    const mapSleepContent = document.getElementById("mapSleepContent")
    mapSleepTitle.hidden = !user.is_invited_sunday
    mapSleepContent.hidden = !user.is_invited_sunday
    // Set sleep labels
    if(user.is_invited_to_sleep) {
        if(isMultipleGuest) {
            mapSleepTitle.textContent = "Et si vous dormiez sur place avec nous ?"
            mapSleepContent.textContent = "Vous avez été identifiés dans la team des fêtards ! Pour vous permettre de danser toute la nuit avec nous (et ce dès vendredi soir !), nous vous avons réservé un lit au château près de nous.\n\rUne partie des nuitées est prise en charge de notre côté, il restera 30€ par personne et par nuit à votre charge. Pensez à nous indiquer dans le formulaire si vous dormez sur place ou non."
        } else {
            mapSleepTitle.textContent = "Et si tu dormais sur place avec nous ?"
            mapSleepContent.textContent = "Tu as été identifié dans la team des fêtards ! Pour te permettre de danser toute la nuit avec nous (et ce dès vendredi soir !), nous t'avons réservé un lit au château près de nous.\n\rUne partie des nuitées est prise en charge de notre côté, il restera 30€ par personne et par nuit à ta charge. Pense à nous indiquer dans le formulaire si tu dors sur place ou non."
        }
    } else {
        // TODO Rajouter une liste de lien (faire un essai)
        mapSleepTitle.textContent = "Besoin de dormir dans les environs ?"
        if(isMultipleGuest) {
            mapSleepContent.textContent = "Voici une liste de quelques gîtes et hôtels à proximité. N'hésitez pas à regarder également sur Douai et Arras, les 2 grandes villes des environs."
        } else {
            mapSleepContent.textContent = "Voici une liste de quelques gîtes et hôtels à proximité. N'hésite pas à regarder également sur Douai et Arras, les 2 grandes villes des environs."
        }
    }
}

window.fillMaps = fillMaps