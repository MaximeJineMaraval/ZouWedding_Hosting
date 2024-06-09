const token = 'o0pJ9uzhCRFeCHA3KKCpWAiTw68oAR8C'
const FOOD_CHOICE_CLASSIC = "CLASSIC"
const FOOD_CHOICE_CHEESE = "CHEESE"
const FOOD_CHOICE_VG = "VG"

// Retrieve the user
if(sessionStorage.user === undefined) {
    window.location.href = "index.html"
}

//TODO Afficher un loader et cacher le contenu de la page

const getUserApiUrl = `https://api.baserow.io/api/database/rows/table/302843/${sessionStorage.user}/?user_field_names=true`
const getUserRequestOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Token ${token}`,
      }
}
fetch(getUserApiUrl, getUserRequestOptions)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            fillThePage(data)
        })
        .catch(error => {
            console.log(error)
        })


function fillThePage(user) {
    //TODO cacher le loader et afficher le contenu de la page
    fillHeader(user)
    fillPlanning(user)
    fillMaps(user)
    fillForm(user)

    // on save
    const saveButton = document.getElementById("saveButton")
    saveButton.addEventListener("click", function(){
        const fridayCheckbox = document.getElementById("fridayCheckbox")
        const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
        const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
        const sundayCheckbox = document.getElementById("sundayCheckbox")
        const burgerClassic = document.getElementById("burgerClassic")
        const burgerCheese = document.getElementById("burgerCheese")
        const burgerVg = document.getElementById("burgerVg")
        let foodString = ""
        if(burgerClassic.checked) {
            foodString = FOOD_CHOICE_CLASSIC
        }
        if(burgerCheese.checked) {
            foodString = FOOD_CHOICE_CHEESE
        }
        if(burgerVg.checked) {
            foodString = FOOD_CHOICE_VG
        }

        const apiUrl = `https://api.baserow.io/api/database/rows/table/302843/${user.id}/?user_field_names=true`

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                has_answered: true,
                join_friday: fridayCheckbox.checked,
                join_full_saturday: saturdayFullCheckbox.checked,
                join_sunday: sundayCheckbox.checked,
                join_cocktail: saturdayCocktailCheckbox.checked,
                food: foodString
            })
        }
        
        fetch(apiUrl, requestOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                console.log(JSON.stringify(data))
                // TODO afficher une snackbar
            })
            .catch(error => {
                console.log(error)
                // TODO afficher une snackbar
            })
    })
} 

function fillHeader(user) {
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
}

function fillPlanning(user) {
    const planningFridayBlock = document.getElementById("planningFridayBlock")
    planningFridayBlock.hidden = !user.is_invited_friday

    const planningSundayBlock = document.getElementById("planningSundayBlock")
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
}

function fillMaps(user) {
    const mapCityHallBlock = document.getElementById("mapCityHallBlock")
    mapCityHallBlock.hidden = !user.is_invited_friday

    const mapCastleTitle = document.getElementById("mapCastleTitle")
    if(user.is_invited_sunday) {
        mapCastleTitle.textContent = "Samedi & Dimanche" 
    } else {
        mapCastleTitle.textContent = "Samedi"
    }

    const mapHostelBlock = document.getElementById("mapHostelBlock")
    mapHostelBlock.hidden = !user.is_invited_sunday && !user.is_invited_full_saturday
}

function fillForm(user) {
    // show or hide checkbox
    const fridayCheckboxContainer = document.getElementById("fridayCheckboxContainer")
    const saturdayCocktailCheckboxContainer = document.getElementById("saturdayCocktailCheckboxContainer")
    const saturdayFullCheckboxContainer = document.getElementById("saturdayFullCheckboxContainer")
    const sundayCheckboxContainer = document.getElementById("sundayCheckboxContainer")
    fridayCheckboxContainer.hidden = !user.is_invited_friday
    saturdayCocktailCheckboxContainer.hidden = user.is_invited_full_saturday
    saturdayFullCheckboxContainer.hidden = !user.is_invited_full_saturday
    sundayCheckboxContainer.hidden = !user.is_invited_sunday

    // pre-fill checkbox
    const fridayCheckbox = document.getElementById("fridayCheckbox")
    const saturdayCocktailCheckbox = document.getElementById("saturdayCocktailCheckbox")
    const saturdayFullCheckbox = document.getElementById("saturdayFullCheckbox")
    const sundayCheckbox = document.getElementById("sundayCheckbox")
    fridayCheckbox.checked = user.join_friday
    saturdayCocktailCheckbox.checked = user.join_cocktail
    saturdayFullCheckbox.checked = user.join_full_saturday
    sundayCheckbox.checked = user.join_sunday

    // show or hide food section
    const formFoodBlock = document.getElementById("formFoodBlock")
    formFoodBlock.hidden = !user.is_invited_full_saturday

    // pre-fill food radio buttons
    const burgerClassic = document.getElementById("burgerClassic")
    const burgerCheese = document.getElementById("burgerCheese")
    const burgerVg = document.getElementById("burgerVg")
    burgerClassic.checked = user.food === FOOD_CHOICE_CLASSIC
    burgerCheese.checked = user.food === FOOD_CHOICE_CHEESE
    burgerVg.checked = user.food === FOOD_CHOICE_VG

    // enable or disabled save button + update user
    triggerSaveButtonDisabled(user)
    burgerClassic.onclick = function() { 
        triggerSaveButtonDisabled(user) 
    }
    burgerCheese.onclick = function() { 
        triggerSaveButtonDisabled(user)
    }
    burgerVg.onclick = function() { 
        triggerSaveButtonDisabled(user) 
    }
}

function triggerSaveButtonDisabled(user) {
    const saveButton = document.getElementById("saveButton")
    saveButton.disabled = user.is_invited_full_saturday && (burgerClassic.checked === false) && (burgerCheese.checked === false) && (burgerVg.checked === false)
}
