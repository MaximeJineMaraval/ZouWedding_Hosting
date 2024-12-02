function fillInfoSection(isMultipleGuest) {
    if(isMultipleGuest) {
        document.getElementById("infoDressCodeLabel").textContent = "Chez nous, pas de thème particulier, nous ne sommes ni chics, ni bohèmes, exprimez votre propre style.\n\rMais pour coller à nos couleurs préférées, les filles devront avoir une touche de vert et les garçons une touche de rose."
        document.getElementById("infoNoKidsTitle").textContent = "Ce n’est pas que notre Saint Valentin, venez sans vos bambins"
        document.getElementById("infoNoKidsLabel").textContent = "Vous l'aurez compris, nous faisons le choix d'un mariage entre adultes, car nous souhaitons profiter à 100% de vous 😘"
        document.getElementById("infoWinterLabel").textContent = "Même si le lieu du samedi après-midi est chauffé, ça reste le mois de février, alors pensez à prendre une liquette ou à investir dans un Damart (il y en a des moins cher chez Decat !)"
    } else {
        document.getElementById("infoDressCodeLabel").textContent = "Chez nous, pas de thème particulier, nous ne sommes ni chics, ni bohèmes, exprime ton propre style.\n\rMais pour coller à nos couleurs préférées, les filles devront avoir une touche de vert et les garçons une touche de rose."
        document.getElementById("infoNoKidsTitle").textContent = "Ce n’est pas que notre Saint Valentin, viens sans tes bambins"
        document.getElementById("infoNoKidsLabel").textContent = "Tu l'auras compris, nous faisons le choix d'un mariage entre adultes, car nous souhaitons profiter à 100% de toi 😘"
        document.getElementById("infoWinterLabel").textContent = "Même si le lieu du samedi après-midi est chauffé, ça reste le mois de février, alors pense à prendre une liquette ou à investir dans un Damart (il y en a des moins cher chez Decat !)"
    }
}

window.fillInfoSection = fillInfoSection