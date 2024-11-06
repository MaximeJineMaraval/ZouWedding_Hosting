function fillPlanning(user) {
    const planningFridayBlock = document.getElementById("planningFridayBlock")
    planningFridayBlock.hidden = !user.is_invited_friday

    const planningSundayBlock = document.getElementById("planningSundayBlock")
    planningSundayBlock.hidden = !user.is_invited_sunday

    const planningSaturdayEventType = document.getElementById("planningSaturdayEventType")
    const planningSaturdayHour = document.getElementById("planningSaturdayHour")
    if(user.is_invited_full_saturday) {
        planningSaturdayEventType.textContent = "Cérémonie laïque\nVin d'honneur\nRepas"
        planningSaturdayHour.textContent = "15h00"
    } else {
        planningSaturdayEventType.textContent = "Vin d'honneur"
        planningSaturdayHour.textContent = "16h30"
    }
}

window.fillPlanning = fillPlanning