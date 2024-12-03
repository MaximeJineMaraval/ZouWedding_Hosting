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
    // Set sleep labels
    if(user.is_invited_to_sleep) {
        if(isMultipleGuest) {
            mapSleepTitle.textContent = "Et si vous dormiez sur place avec nous ?"
            mapSleepContent.textContent = "Vous avez été identifiés dans la team des fêtards ! Pour vous permettre de danser toute la nuit avec nous (et ce dès vendredi soir !), nous vous avons réservé un lit au château près de nous.\n\rUne partie des nuitées est prise en charge de notre côté, il restera 30€ par personne et par nuit à votre charge. Pensez à nous indiquer dans le formulaire si vous dormez sur place ou non."
        } else {
            mapSleepTitle.textContent = "Et si tu dormais sur place avec nous ?"
            mapSleepContent.textContent = "Tu as été identifié dans la team des fêtards ! Pour te permettre de danser toute la nuit avec nous (et ce dès vendredi soir !), nous t'avons réservé un lit au château près de nous.\n\rUne partie des nuitées est prise en charge de notre côté, il restera 30€ par personne et par nuit à ta charge. Pense à nous indiquer dans le formulaire si tu dors sur place ou non."
        }
    } else if(user.is_invited_sunday)  {
        // TODO Rajouter une liste de lien (faire un essai)
        mapSleepTitle.textContent = "Besoin de dormir dans les environs ?"
        if(isMultipleGuest) {
            mapSleepContent.textContent = "Voici une liste de quelques gîtes et hôtels à proximité. N'hésitez pas à regarder également sur Douai et Arras, les 2 grandes villes des environs."
        } else {
            mapSleepContent.textContent = "Voici une liste de quelques gîtes et hôtels à proximité. N'hésite pas à regarder également sur Douai et Arras, les 2 grandes villes des environs."
        }
        mapSleepContent.appendChild(getLinkFor("La Ferme de l'Abbaye", "https://www.ferme-abbaye.com/"))
        mapSleepContent.appendChild(getLinkFor("La ferme de l'Ostrevent", "https://www.la-ferme-de-lostrevent.com/"))
        mapSleepContent.appendChild(getLinkFor("Les chambres du moulin à Arleux", "https://www.google.com/search?q=Les+chambres+du+moulin+%C3%A0+Arleux&rlz=1C5CHFA_enFR1070FR1070&oq=Les+chambres+du+moulin+%C3%A0+Arleux&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCggCEAAYgAQYogQyCggDEAAYgAQYogQyCggEEAAYgAQYogQyCggFEAAYgAQYogQyBggGEEUYQNIBBzIyMWowajeoAgiwAgE&sourceid=chrome&ie=UTF-8"))
        mapSleepContent.appendChild(getLinkFor("Hôtel l'Aquarium à Fresnes-lès-Montauban", "https://www.aquarium62.fr/"))
    } else {
        mapSleepTitle.hidden = true
        mapSleepContent.hidden = true
    }
}

function getLinkFor(label, url) {
    let link = document.createElement("a")
    link.href = url
    link.textContent = `\n\r${label}`
    link.target = "_blank"
    return link
}

window.fillMaps = fillMaps